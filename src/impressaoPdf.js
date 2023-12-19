const btnImprimir = document.querySelector("#btnImprimir");

btnImprimir.addEventListener("click", () => {
  const clonedTable = document.querySelector("#tableAluno").cloneNode(true);

  clonedTable.querySelector(".nome-edit-coluna").remove();
  clonedTable.querySelector(".nome-delete-coluna").remove();

  // Remove os botões de edit
  const editButtons = clonedTable.querySelectorAll('[id^="edit-"]');
  editButtons.forEach((button) => button.remove());

  //remove os botões de delete
  const deleteButtons = clonedTable.querySelectorAll('[id^="delete-"]');
  deleteButtons.forEach((button) => button.remove());

  // Conteúdo para impressão
  const content = clonedTable;

  //config impressao
  const options = {
    margin: [10, 10, 10, 10],
    filename: "arquivo.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  //gera e baixa
  html2pdf().set(options).from(content).save();
});
