// FAQ: tekst z Framera, poprawiona tylko spacja w „express - wówczas”.
// Opinie z wizytówki Google - screeny w src/assets/opinie-google (Mapy Google, 07.11.2026),
// bez dat (względne „3 tygodnie temu” na stałym obrazku z czasem byłyby nieprawdziwe),
// bez przycisków i odpowiedzi właściciela. Wybór: Aegis, do zatwierdzenia przez Roberta.
// Tekst poniżej to dosłowna treść opinii - idzie do alt obrazka (czytniki ekranu, wyszukiwarki).
// Klucz = nazwa pliku bez .png.
export const opinieGoogle: Record<string, { autor: string; tekst: string }> = {
	'01-ryszard-barcinski': { autor: 'Ryszard Barcinski', tekst: 'WEMONT to bardzo świetna i profesjonalna firma. Zamówiłem tam brame garażową i drzwi wejściowe zewnętrzne z montażem. Zostałem mile obsłużony i udzielono mi fachowego doradztwa. Zamówienie zostało zrealizowane w umówionym terminie. A teraz najlepsze, pan który przyjechał montować to mistrz w tym co robi. Prace wykonywał sam , powoli starannie i bardzo dokładnie. Usługa została wykonana perfekcyjnie z udzieleniem na koniec szkolenia z obsługi. Serdecznie polecam firmę WEMONT a dla Pana montera szacun za profesjonalizm.' },
	'02-mariusz-mrotek': { autor: 'Mariusz Mrotek', tekst: 'Serdecznie polecamy. Z usługi skorzystaliśmy po analizie opinii o firmie. Potwierdzamy duże doświadczenie i profesjonalizm w każdym momencie. Pomiary zrobione precyzyjnie, doradztwo, wykonanie i montaż idealnie i co najważniejsze w obiecanym terminie. Dziękujemy i życzmy firmie dobrych zleceń.' },
	'03-bartosz-wojcik': { autor: 'Bartosz Wójcik', tekst: 'Polecam firmę wemont z czystym sumieniem. Pełen profesjonalizm, obsługa i montaż na najwyższym poziomie. Brama jak i segmenty zrobione bardzo porządnie widać jakość, nie to co w marketach. Cena adekwatna do jakości. Pozdrawiam' },
	'04-michal-sobolewski': { autor: 'Michał Sobolewski', tekst: 'Polecam serdecznie ten salon. Ja dorabiałem tylko piloty do bramy, ale kontakt z osobami w salonie profesjonalny,miły i przyjacielski. Realizacja zlecenia bez zarzutu zgodnie z dokonanymi ustaleniami oraz terminami. Kontakt bezproblemowy z kimkolwiek się komunikujesz, każdy zna temat sprawy, co świadczy o komunikacji wewnętrznej w firmie. Polecam serdecznie.' },
	'05-rewers-sylwia': { autor: 'Rewers Sylwia', tekst: 'Pełen profesjonalizm od pierwszego kontaktu aż po realizację. Bardzo dobre doradztwo, konkretne podejście do klienta i terminowy montaż. Widać, że firma zna się na swojej pracy i stawia na jakość, a nie „byle zrobić”. Polecam!' },
	'06-biuro-archcenter': { autor: 'Biuro Archcenter', tekst: 'Znakomita obsługa – konkretna, sprawna i wyjątkowo szybka. Jestem naprawdę pod wrażeniem, bo dziś taki poziom profesjonalizmu to rzadkość. Szczególne podziękowania dla Pana Mirosława – pełna klasa i najwyższy standard obsługi. Współpraca na poziomie, który zdecydowanie warto polecić!' },
	'07-aleksandra-kita': { autor: 'Aleksandra Kita', tekst: 'Z całego serca polecam salon Wemont. Brama garażowa została wykonana perfekcyjnie – solidnie, estetycznie i dokładnie tak, jak sobie wyobrażałam. Ekipa działa sprawnie, terminowo i bardzo profesjonalnie. Kontakt z firmą szybki i bezproblemowy, wszystko wyjaśnione jasno i uczciwie. Jeśli ktoś szuka porządnej bramy albo ogrodzenia i dobrych fachowców – zdecydowanie warto wybrać właśnie ich 😁' },
	'08-olivia': { autor: 'OliVia', tekst: 'Bardzo profesjonalna firma! Zlecenie zostało wykonane perfekcyjnie, z dbałością o każdy szczegół. Kontakt z pracownikami był wzorowy, zawsze chętnie odpowiadali na pytania. Jestem pod wrażeniem jakości usług firmy WEMONT i na pewno skorzystam ponownie w przyszłości. Takiego partnera firmy WIŚNIOWSKI w Kołobrzegu było trzeba ! POLECAM !!! :)' },
	'09-artur-lech': { autor: 'Artur Lech', tekst: 'Świetny kontakt z Panem Mirosławem – od samego początku wszystko jasno i rzeczowo wyjaśnione. Zostałem pokierowany krok po kroku przez cały proces, co bardzo ułatwiło współpracę. Panowie montażyści spisali się na medal – nie tylko zamontowali nową bramę i drzwi wejściowe, ale również bez narzekania wykonali dodatkowe prace, takie jak rozbiórka tymczasowej bramy. Cały zespół wykonał swoją pracę perfekcyjnie, z dbałością o szczegóły. Z czystym sumieniem polecam tego wykonawcę!' },
	'10-joanna-andrusieczko': { autor: 'Joanna Andrusieczko', tekst: 'Z całego serca polecam tę firmę! Profesjonalizm od pierwszego kontaktu aż po zakończenie montażu. Ekipa punktualna, uprzejma i przede wszystkim bardzo dokładna – brama została zamontowana perfekcyjnie, wszystko działa bez zarzutu. Widać, że znają się na rzeczy i podchodzą do swojej pracy z pasją. Dodatkowo świetny kontakt, rzetelne doradztwo i terminowość – dziś to naprawdę rzadkość. Jestem bardzo zadowolona i na pewno będę polecać znajomym!' },
	'11-patrycja-t': { autor: 'Patrycja T', tekst: 'Z pełnym przekonaniem mogę polecić firmę Wemont! Od początku współpracy byłam pod wrażeniem profesjonalizmu. Przeprowadzili dokładny pomiar, a doradztwo było na bardzo wysokim poziomie – z pełnym zaangażowaniem pomogli mi dobrać najlepsze rozwiązanie. Zakup bramy i ogrodzenia to była czysta przyjemność, a sama realizacja projektu przebiegła błyskawicznie. Montaż został wykonany bardzo sprawnie, bez żadnych opóźnień, a efekt końcowy jest imponujący. Polecam Wemont każdemu, kto szuka solidnej firmy do bram i ogrodzeń!' },
	'12-roman-kubrak': { autor: 'Roman Kubrak', tekst: 'Współpracuję z Firmą WEMONT Sp. z o.o. od początku jej powstania. Jednym zdaniem mogę określić: zespół fachowców wiedzących co zaoferować i jak zrealizować zamówienie. Gratuluję umiejętności w negocjacjach jak i efektach końcowych montażu. Polecam WEMONT ze spokojem, każdy znajdzie tu coś dla siebie. Pozdrawiam serdecznie Roman Kubrak' },
};

// Wizytówka Wemont w Mapach Google (ten sam link co w górnym pasku).
export const linkDoOpinii = 'https://maps.app.goo.gl/JbgDnKqMGwJug7CT6';

export const faq = [
	{
		pytanie: 'Ile kosztuje pomiar i przygotowanie oferty?',
		odpowiedz: 'U nas pomiar i przygotowanie oferty nic nie kosztuje. Na przygotowanie oferty potrzebujemy zwykle około 2 dni.',
	},
	{
		pytanie: 'Jak długo czeka się na dostawę bramy garażowej?',
		odpowiedz: 'Dostawa bram zajmuje z reguły około 4-5 tygodni. Mamy w ofercie również opcję express - wówczas tylko 1 tydzień ;-)',
	},
	{
		pytanie: 'Jakie produkty mogę u Was zobaczyć na ekspozycji?',
		odpowiedz: 'Nasza bogata ekspozycja zawiera bramę segmentową, drzwi zewnętrzne, okna oraz ogrodzenia w wybranych wzorach.',
	},
];
