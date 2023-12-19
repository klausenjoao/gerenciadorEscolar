const btnImprimir = document.querySelector("#btnImprimir");

btnImprimir.addEventListener("click", () =>{

    //conteudo impressao
    const content=document.querySelector("#tableAluno")

    //config impressao
    const options= {
        margin: [10,10,10,10],
        filename:'arquivo.pdf',
        html2canvas: {sacle:2},
        jsPDF:{unit:"mm", format:'a4', orientation:'portrait'}
    }

    //gera e baixa
    html2pdf().set(options).from(content).save();
})