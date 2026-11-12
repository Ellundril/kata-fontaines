// =====================================================
// Kata JS 7 — Fontaines à boire (aller plus loin)
// Suis les TODO dans l'ordre. La constante reponse vient de fontaines.js.
// =====================================================

// TODO 1 — Explorer la réponse dans la console
// Sans écrire de fonction, affiche avec console.log :
// a. le nombre total de fontaines annoncé par la réponse
// b. le nombre de fontaines réellement présentes dans results
// c. la voie de la première fontaine
// d. la latitude de la deuxième fontaine
// e. le motif d'indisponibilité de la cinquième fontaine
console.log(reponse.total_count);
console.log(reponse.results.length);
console.log(reponse.results[0].voie);
console.log(reponse.results[1].geo_point_2d.lat);
console.log(reponse.results[4].motif_ind);
// TODO 2 — extraireFontaines(reponse)
// Retourne le tableau des fontaines, sans l'enveloppe.
function extraireFontaines(reponse) {
  return reponse.results;
}
const fontaines = extraireFontaines(reponse);
// TODO 3 — afficherFontaines(liste)
// 1. Vide <ul id="liste">
// 2. Un <li> par fontaine : la voie, puis la commune
// 3. Une fontaine hors service reçoit la classe "hors-service"
//    et son motif entre parenthèses
// 4. Le compteur affiche « 8 fontaines »
const listeFontaines = document.getElementById("liste");
const compteur = document.getElementById("compteur");

function afficherFontaines(liste) {
  listeFontaines.innerHTML = "";
  liste.forEach((fontaine) => {
    const fontaineLi = document.createElement("li");
    const voie = fontaine.voie;
    const commune = fontaine.commune;
    fontaineLi.textContent = `${voie} ${commune}`;
    if (fontaine.dispo === "NON") {
      fontaineLi.classList.add("hors-service");
      fontaineLi.textContent = `${voie} ${commune} (${fontaine.motif_ind})`;
    }
    listeFontaines.appendChild(fontaineLi);
  });
  compteur.textContent = `${liste.length} fontaines`;
}
// TODO 4 — Au chargement, affiche toutes les fontaines.
afficherFontaines(fontaines);
// TODO 5 — Une fonction en argument
// a. estEnService(fontaine) retourne true si la fontaine est disponible
// b. filtrer(liste, test) retourne un nouveau tableau avec les fontaines
//    pour lesquelles test(fontaine) vaut true
// c. Au clic sur « En service seulement », affiche filtrer(..., estEnService)
function estEnService(fontaine) {
  return fontaine.dispo === "OUI";
}

function filtrer(liste, test) {
  let tabResult = [];
  for (const fontaine of liste) {
    if (test(fontaine)) {
      tabResult.push(fontaine);
    }
  }
  return tabResult;
}
const btnEnService = document.getElementById("btn-en-service");

btnEnService.addEventListener("click", () => {
  const fontainesEnService = fontaines.filter(estEnService); //remplacé pour le bonus
  const fontainesEnServiceArrondissement = filtrer(
    fontainesEnService,
    (fontaine) => fontaine.commune === select.value,
  );
  switch (btnEnService.textContent) {
    case "En service seulement":
      if (select.value !== "tous") {
        afficherFontaines(fontainesEnServiceArrondissement);
      } else {
        afficherFontaines(fontainesEnService);
      }
      btnEnService.textContent = "En et hors service";
      break;
    case "En et hors service":
      if (select.value !== "tous") {
        afficherFontaines(
          filtrer(fontaines, (fontaine) => fontaine.commune === select.value),
        );
      } else {
        afficherFontaines(fontaines);
      }
      btnEnService.textContent = "En service seulement";
      break;
  }
});

// TODO 6 — Une fonction fléchée en argument
// Quand on change l'arrondissement dans le <select>, affiche seulement
// les fontaines de cet arrondissement, avec filtrer et une fonction
// fléchée écrite directement dans l'appel.
// « Tous » réaffiche toutes les fontaines.
const select = document.getElementById("choix-commune");

select.addEventListener("change", () => {
  const arrondissement = select.value;
  if (arrondissement === "tous") {
    afficherFontaines(fontaines);
  } else {
    const fontaineArrondissement = filtrer(
      fontaines,
      (fontaine) => fontaine.commune === arrondissement,
    );
    afficherFontaines(fontaineArrondissement);
  }
});

// =====================================================
// Questions de recul (réponds en commentaire ici)
// 1. Si j'écris filtrer(fontaines, estEnService()) avec des parenthèses, un message d'erreur s'affiche : script.js:56 Uncaught TypeError: Cannot read properties of undefined (reading 'dispo'), la fonction est exécutée directement alors qu'il faut que ce soit filtrer qui lance l'exécution à chaque itération. Du coup elle n'a pas encore d'argument puisque les arguments lui seront passés par filtrer.
// 2.J'imagine que si tous les résultats ne sont pas encore arrivés, on peut avoir une longueur de result plus petite que total_count suivant comment fonctionne l'API.
// 3. Une fonction qui appelle une fonction va l'exécuter seulement au moment où elle l'appelle alors qu'une fonction qui reçoit une fonction reçoit en réalité le retour de la fonction reçue en argument et se sert ensuite de l'argument dans son exécution.
// PS: pour le pour aller plus loin : .filter() je ne l'ai remplacé que sur une ligne sinon ma fonction filtrer ne sert plus à rien et je trouvais ça dommage. Donc j'ai fait un mix des deux.
//=====================================================
