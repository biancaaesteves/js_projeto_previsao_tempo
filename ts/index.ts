const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
	document.querySelector("#input-localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
	event.preventDefault();

	if (!input || !sectionTempoInfo) return;
	// se o input ou a section for nulo, se não achar o input na página ou a section, saia da função.
	// Tem que ter, se não tiver, não tenho onde mostrar o conteúdo.

	const localizacao = input?.value;

	if (localizacao.length < 3) {
		alert("O local precisa ter, pelo menos, 3 letras");
		return;
	}
	//* Preciso fazer uma requisição na localização:

	try {
		// tenta fazer essa requisição, e se der tudo certo... :
		const resposta = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=2d171cc80576f7b53c4135bfc0ddd85f&units=metric`
		);
		// Faz a requisição htttp p/ essa url e eu quero obter a resposta.

		const dados = await resposta.json();
		// e quero essa resposta transformada p/ json.

		console.log(dados);

		const infos = {
			temperatura: Math.round(dados.main.temp),
			local: dados.name,
			icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
		};

		sectionTempoInfo.innerHTML = `
		<div class="tempo-dados">
			<h2>${infos.local}</h2> 
	
			<span>${infos.temperatura}º</span>
		</div>
	
	<img src="${infos.icone}">
		`;
		// innerHTML define o html que vai estar dentro dessa seção.
	} catch (err) {
		// ...se der um erro:
		console.log("Deu um erro na obtenção dos dados da API.", err);
	}
});
