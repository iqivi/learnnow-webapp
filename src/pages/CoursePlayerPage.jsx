import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCourseProgress } from "@/hooks";
import {
	ArrowLeft,
	Play,
	FileText,
	ChevronRight,
	Clock,
	CheckCircle,
	MessageSquare,
	ThumbsUp,
	Star,
	Send,
	AlertCircle,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { QuizDisplay } from "@/components/elements";

export function CoursePlayerPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	// Tablica wszystkich dostępnych kursów
	const allCourses = [
		{
			id: 1,
			title: "Kompletny kurs JavaScript od podstaw do zaawansowanych",
			instructor: "Jan Kowalski",
			instructorEmail: "jan.kowalski@example.com",
		},
		{
			id: 2,
			title: "React.js - Tworzenie nowoczesnych aplikacji webowych",
			instructor: "Anna Nowak",
			instructorEmail: "anna.nowak@example.com",
		},
		{
			id: 3,
			title: "Wprowadzenie do Python - Programowanie dla początkujących",
			instructor: "Piotr Wiśniewski",
			instructorEmail: "piotr.wisniewski@example.com",
		},
		{
			id: 4,
			title: "Node.js i Express - Backend Development",
			instructor: "Tomasz Zieliński",
			instructorEmail: "tomasz.zielinski@example.com",
		},
		{
			id: 5,
			title: "UI/UX Design - Projektowanie interfejsów użytkownika",
			instructor: "Maria Lewandowska",
			instructorEmail: "maria.lewandowska@example.com",
		},
		{
			id: 6,
			title: "Cyberbezpieczeństwo - Zagrożenia i ochrona",
			instructor: "Krzysztof Nowak",
			instructorEmail: "krzysztof.nowak@example.com",
		},
		{
			id: 7,
			title: "SQL i relacyjne bazy danych",
			instructor: "Magdalena Kowalska",
			instructorEmail: "magdalena.kowalska@example.com",
		},
		{
			id: 8,
			title: "Zaawansowane bezpieczeństwo sieciowe",
			instructor: "Andrzej Lewandowski",
			instructorEmail: "andrzej.lewandowski@example.com",
		},
		{
			id: 9,
			title: "Vue.js - Progressive Framework",
			instructor: "Katarzyna Szymańska",
			instructorEmail: "katarzyna.szymanska@example.com",
		},
		{
			id: 10,
			title: "MongoDB - NoSQL bazy danych",
			instructor: "Paweł Dabrowski",
			instructorEmail: "pawel.dabrowski@example.com",
		},
		{
			id: 11,
			title: "Penetration Testing - Praktyczne podejście",
			instructor: "Marcin Sikora",
			instructorEmail: "marcin.sikora@example.com",
		},
		{
			id: 12,
			title: "TypeScript - Programowanie typowane",
			instructor: "Zofia Nowak",
			instructorEmail: "zofia.nowak@example.com",
		},
	];

	// Struktura lekcji dla każdego kursu
	const courseLessons = {
		1: [
			// JavaScript
			{
				id: 101,
				courseId: 1,
				type: "video",
				title: "Zmienne i typy danych",
				content: "https://youtube.com/watch?v=...",
				duration: 18,
				order: 1,
				completed: true,
			},
			{
				id: 102,
				courseId: 1,
				type: "video",
				title: "Funkcje i zakresy",
				content: "https://youtube.com/watch?v=...",
				duration: 22,
				order: 2,
				completed: true,
			},
			{
				id: 103,
				courseId: 1,
				type: "text",
				title: "Asynchroniczność - Promises i async/await",
				content: "Promises to fundamentalny koncept w JS...",
				order: 3,
				completed: false,
			},
			{
				id: 104,
				courseId: 1,
				type: "video",
				title: "DOM Manipulation",
				content: "https://youtube.com/watch?v=...",
				duration: 25,
				order: 4,
				completed: false,
			},
			{
				id: 105,
				courseId: 1,
				type: "quiz",
				title: "Quiz - Zmienne i Funkcje",
				questions: [
					{
						id: 0,
						question: "Co to jest closure?",
						options: [
							"Niemożliwość funkcji",
							"Funkcja mająca dostęp do zmiennych",
							"Typ błędu",
							"Brak",
						],
						correctAnswer: 1,
					},
					{
						id: 1,
						question: "Jaka jest różnica między var a let?",
						options: [
							"Brak różnicy",
							"let ma blokowy zakres",
							"var jest szybszy",
							"let nie działa",
						],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		2: [
			// React
			{
				id: 201,
				courseId: 2,
				type: "video",
				title: "Wprowadzenie do React i JSX",
				content: "https://youtube.com/watch?v=...",
				duration: 20,
				order: 1,
				completed: true,
			},
			{
				id: 202,
				courseId: 2,
				type: "video",
				title: "Komponenty i Props",
				content: "https://youtube.com/watch?v=...",
				duration: 24,
				order: 2,
				completed: true,
			},
			{
				id: 203,
				courseId: 2,
				type: "text",
				title: "React Hooks - useState i useEffect",
				content:
					"Hooks pozwalają na korzystanie ze stanu w komponentach funkcyjnych...",
				order: 3,
				completed: false,
			},
			{
				id: 204,
				courseId: 2,
				type: "video",
				title: "Context API i State Management",
				content: "https://youtube.com/watch?v=...",
				duration: 28,
				order: 4,
				completed: false,
			},
			{
				id: 205,
				courseId: 2,
				type: "quiz",
				title: "Quiz - Komponenty React",
				questions: [
					{
						id: 0,
						question: "Jaka jest różnica między props a state?",
						options: [
							"Żadna",
							"Props są read-only",
							"State nie zmienia się",
							"Props to funkcje",
						],
						correctAnswer: 1,
					},
					{
						id: 1,
						question: "Do czego służy Hook useEffect?",
						options: [
							"Do stylizacji",
							"Do efektów ubocznych",
							"Do renderowania",
							"Do walidacji",
						],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		3: [
			// Python
			{
				id: 301,
				courseId: 3,
				type: "video",
				title: "Środowisko Python i pierwsza linijka kodu",
				content: "https://youtube.com/watch?v=...",
				duration: 15,
				order: 1,
				completed: true,
			},
			{
				id: 302,
				courseId: 3,
				type: "text",
				title: "Typy danych i zmienne",
				content:
					"Python jest językiem dynamicznie typowanym. Poznaj int, str, list, dict...",
				order: 2,
				completed: true,
			},
			{
				id: 303,
				courseId: 3,
				type: "video",
				title: "Pętle i instrukcje warunkowe",
				content: "https://youtube.com/watch?v=...",
				duration: 19,
				order: 3,
				completed: false,
			},
			{
				id: 304,
				courseId: 3,
				type: "text",
				title: "Funkcje i moduły",
				content: "Jak tworzyć funkcje i importować moduły w Pythonie...",
				order: 4,
				completed: false,
			},
			{
				id: 305,
				courseId: 3,
				type: "quiz",
				title: "Quiz - Podstawy Python",
				questions: [
					{
						id: 0,
						question: "Jak zakomentować linijkę w Pythonie?",
						options: ["//", "#", "/*", "<!--"],
						correctAnswer: 1,
					},
					{
						id: 1,
						question: "Jaka będzie wartość: len([1,2,3])?",
						options: ["2", "3", "4", "1"],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		4: [
			// Node.js
			{
				id: 401,
				courseId: 4,
				type: "video",
				title: "Instalacja Node.js i npm",
				content: "https://youtube.com/watch?v=...",
				duration: 12,
				order: 1,
				completed: true,
			},
			{
				id: 402,
				courseId: 4,
				type: "text",
				title: "Moduły Node.js i require/import",
				content: "Poznaj jak działają moduły w Node.js i systemy modułów...",
				order: 2,
				completed: true,
			},
			{
				id: 403,
				courseId: 4,
				type: "video",
				title: "Express.js - Tworzenie API",
				content: "https://youtube.com/watch?v=...",
				duration: 26,
				order: 3,
				completed: false,
			},
			{
				id: 404,
				courseId: 4,
				type: "video",
				title: "Middleware i routing",
				content: "https://youtube.com/watch?v=...",
				duration: 23,
				order: 4,
				completed: false,
			},
			{
				id: 405,
				courseId: 4,
				type: "quiz",
				title: "Quiz - Node.js i Express",
				questions: [
					{
						id: 0,
						question: "Co oznacza npm?",
						options: [
							"Node Package Manager",
							"Node Program Manager",
							"Network Protocol Manager",
							"Nie Package Manager",
						],
						correctAnswer: 0,
					},
					{
						id: 1,
						question: "Jaki jest domyślny port Express?",
						options: ["3000", "8000", "5000", "9000"],
						correctAnswer: 0,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		5: [
			// UI/UX Design
			{
				id: 501,
				courseId: 5,
				type: "video",
				title: "Zasady UX Design",
				content: "https://youtube.com/watch?v=...",
				duration: 20,
				order: 1,
				completed: true,
			},
			{
				id: 502,
				courseId: 5,
				type: "text",
				title: "Wprowadzenie do Figmy",
				content:
					"Figma to narzędzie do projektowania interfejsów. Poznaj interfejs Figmy...",
				order: 2,
				completed: true,
			},
			{
				id: 503,
				courseId: 5,
				type: "video",
				title: "Tworzenie wireframe'ów",
				content: "https://youtube.com/watch?v=...",
				duration: 22,
				order: 3,
				completed: false,
			},
			{
				id: 504,
				courseId: 5,
				type: "video",
				title: "Testowanie użyteczności",
				content: "https://youtube.com/watch?v=...",
				duration: 18,
				order: 4,
				completed: false,
			},
			{
				id: 505,
				courseId: 5,
				type: "quiz",
				title: "Quiz - UI/UX Design",
				questions: [
					{
						id: 0,
						question: "Co jest ważniejsze w UX?",
						options: ["Estetyka", "Użyteczność", "Kolory", "Animacje"],
						correctAnswer: 1,
					},
					{
						id: 1,
						question: "Co to jest wireframe?",
						options: [
							"Szkic projektu",
							"Kod strony",
							"Plik CSS",
							"Baza danych",
						],
						correctAnswer: 0,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		6: [
			// Cybersecurity
			{
				id: 601,
				courseId: 6,
				type: "video",
				title: "Zagrożenia bezpieczeństwa",
				content: "https://youtube.com/watch?v=...",
				duration: 25,
				order: 1,
				completed: true,
			},
			{
				id: 602,
				courseId: 6,
				type: "text",
				title: "Hasła i autentykacja",
				content:
					"Poznaj best practices dla haseł i wieloskładnikowej autentykacji...",
				order: 2,
				completed: true,
			},
			{
				id: 603,
				courseId: 6,
				type: "video",
				title: "Szyfrowanie danych",
				content: "https://youtube.com/watch?v=...",
				duration: 28,
				order: 3,
				completed: false,
			},
			{
				id: 604,
				courseId: 6,
				type: "video",
				title: "Zabezpieczanie aplikacji webowych",
				content: "https://youtube.com/watch?v=...",
				duration: 30,
				order: 4,
				completed: false,
			},
			{
				id: 605,
				courseId: 6,
				type: "quiz",
				title: "Quiz - Cybersecurity",
				questions: [
					{
						id: 0,
						question: "Co to jest phishing?",
						options: [
							"Typ ataku socjalnego",
							"Bug w kodzie",
							"Problem z siecią",
							"Zapora sieciowa",
						],
						correctAnswer: 0,
					},
					{
						id: 1,
						question: "Jakie jest najlepsze hasło?",
						options: [
							"123456",
							"Losowe 12+ znaków",
							"Imię i nazwisko",
							"Data urodzenia",
						],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		7: [
			// SQL
			{
				id: 701,
				courseId: 7,
				type: "video",
				title: "Wprowadzenie do baz danych",
				content: "https://youtube.com/watch?v=...",
				duration: 18,
				order: 1,
				completed: true,
			},
			{
				id: 702,
				courseId: 7,
				type: "text",
				title: "Podstawowe klauzule SQL (SELECT, WHERE)",
				content: "SELECT służy do pobierania danych, WHERE do filtrowania...",
				order: 2,
				completed: true,
			},
			{
				id: 703,
				courseId: 7,
				type: "video",
				title: "JOINy i relacje",
				content: "https://youtube.com/watch?v=...",
				duration: 24,
				order: 3,
				completed: false,
			},
			{
				id: 704,
				courseId: 7,
				type: "video",
				title: "Indeksy i optymalizacja",
				content: "https://youtube.com/watch?v=...",
				duration: 21,
				order: 4,
				completed: false,
			},
			{
				id: 705,
				courseId: 7,
				type: "quiz",
				title: "Quiz - SQL",
				questions: [
					{
						id: 0,
						question: "Co zwraca SELECT COUNT(*)?",
						options: ["Kolumny", "Wiersze", "Liczbę wierszy", "Tabele"],
						correctAnswer: 2,
					},
					{
						id: 1,
						question: "Jaki jest najczęstszy typ JOINa?",
						options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "FULL JOIN"],
						correctAnswer: 0,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		8: [
			// Advanced Security
			{
				id: 801,
				courseId: 8,
				type: "video",
				title: "Architektura sieci bezpiecznej",
				content: "https://youtube.com/watch?v=...",
				duration: 27,
				order: 1,
				completed: true,
			},
			{
				id: 802,
				courseId: 8,
				type: "text",
				title: "Firewalle i IDS/IPS",
				content:
					"Poznaj jak działają zapory sieciowe i systemy detektowania włamań...",
				order: 2,
				completed: true,
			},
			{
				id: 803,
				courseId: 8,
				type: "video",
				title: "VPN i tunelowanie",
				content: "https://youtube.com/watch?v=...",
				duration: 25,
				order: 3,
				completed: false,
			},
			{
				id: 804,
				courseId: 8,
				type: "video",
				title: "Zaawansowane ataki sieciowe",
				content: "https://youtube.com/watch?v=...",
				duration: 32,
				order: 4,
				completed: false,
			},
			{
				id: 805,
				courseId: 8,
				type: "quiz",
				title: "Quiz - Bezpieczeństwo Sieciowe",
				questions: [
					{
						id: 0,
						question: "Co to jest DDoS atak?",
						options: [
							"Distributed Denial of Service",
							"Data Denial System",
							"Device Distribution Service",
							"Brak",
						],
						correctAnswer: 0,
					},
					{
						id: 1,
						question: "Jaki port używa HTTPS?",
						options: ["80", "443", "8080", "3306"],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		9: [
			// Vue.js
			{
				id: 901,
				courseId: 9,
				type: "video",
				title: "Podstawy Vue.js",
				content: "https://youtube.com/watch?v=...",
				duration: 19,
				order: 1,
				completed: true,
			},
			{
				id: 902,
				courseId: 9,
				type: "text",
				title: "Reactive Data i Binding",
				content:
					"Vue.js automatycznie śledzi zmiany danych i aktualizuje widok...",
				order: 2,
				completed: true,
			},
			{
				id: 903,
				courseId: 9,
				type: "video",
				title: "Komponenty i Slots",
				content: "https://youtube.com/watch?v=...",
				duration: 23,
				order: 3,
				completed: false,
			},
			{
				id: 904,
				courseId: 9,
				type: "video",
				title: "Vue Router i State Management",
				content: "https://youtube.com/watch?v=...",
				duration: 26,
				order: 4,
				completed: false,
			},
			{
				id: 905,
				courseId: 9,
				type: "quiz",
				title: "Quiz - Vue.js",
				questions: [
					{
						id: 0,
						question: "Co to jest v-model?",
						options: ["Two-way binding", "Walidacja", "Routing", "Styling"],
						correctAnswer: 0,
					},
					{
						id: 1,
						question: "Jaka dyrektywa renderuje listę?",
						options: ["v-if", "v-for", "v-show", "v-bind"],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		10: [
			// MongoDB
			{
				id: 1001,
				courseId: 10,
				type: "video",
				title: "Wprowadzenie do NoSQL i MongoDB",
				content: "https://youtube.com/watch?v=...",
				duration: 17,
				order: 1,
				completed: true,
			},
			{
				id: 1002,
				courseId: 10,
				type: "text",
				title: "Dokumenty i kolekcje",
				content: "MongoDB przechowuje dane w formie JSON-like dokumentów...",
				order: 2,
				completed: true,
			},
			{
				id: 1003,
				courseId: 10,
				type: "video",
				title: "Zapytania i filtrowanie",
				content: "https://youtube.com/watch?v=...",
				duration: 21,
				order: 3,
				completed: false,
			},
			{
				id: 1004,
				courseId: 10,
				type: "video",
				title: "Agregacje i mapreduce",
				content: "https://youtube.com/watch?v=...",
				duration: 24,
				order: 4,
				completed: false,
			},
			{
				id: 1005,
				courseId: 10,
				type: "quiz",
				title: "Quiz - MongoDB",
				questions: [
					{
						id: 0,
						question: "Co jest jednostką danych w MongoDB?",
						options: ["Tabela", "Dokument", "Kolumna", "Rekord"],
						correctAnswer: 1,
					},
					{
						id: 1,
						question: "Jaki format danych MongoDB?",
						options: ["XML", "JSON", "BSON", "CSV"],
						correctAnswer: 2,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		11: [
			// Penetration Testing
			{
				id: 1101,
				courseId: 11,
				type: "video",
				title: "Etyka i prawo w testach penetracyjnych",
				content: "https://youtube.com/watch?v=...",
				duration: 22,
				order: 1,
				completed: true,
			},
			{
				id: 1102,
				courseId: 11,
				type: "text",
				title: "Metodologia testowania",
				content:
					"Poznaj OWASP i metodologie przeprowadzania testów penetracyjnych...",
				order: 2,
				completed: true,
			},
			{
				id: 1103,
				courseId: 11,
				type: "video",
				title: "Narzędzia do testowania (Metasploit, Burp)",
				content: "https://youtube.com/watch?v=...",
				duration: 28,
				order: 3,
				completed: false,
			},
			{
				id: 1104,
				courseId: 11,
				type: "video",
				title: "Case studies - Realne scenariusze ataków",
				content: "https://youtube.com/watch?v=...",
				duration: 35,
				order: 4,
				completed: false,
			},
			{
				id: 1105,
				courseId: 11,
				type: "quiz",
				title: "Quiz - Penetration Testing",
				questions: [
					{
						id: 0,
						question: "Co to jest SQL injection?",
						options: [
							"Wstrzyknięcie SQL",
							"Błąd bazy",
							"Typ szyfrowania",
							"Framework",
						],
						correctAnswer: 0,
					},
					{
						id: 1,
						question: "Jaka jest faza OWASP top10?",
						options: ["Analiza", "Ataka", "Zaznajomienie się", "Mapowanie"],
						correctAnswer: 3,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
		12: [
			// TypeScript
			{
				id: 1201,
				courseId: 12,
				type: "video",
				title: "TypeScript vs JavaScript",
				content: "https://youtube.com/watch?v=...",
				duration: 16,
				order: 1,
				completed: true,
			},
			{
				id: 1202,
				courseId: 12,
				type: "text",
				title: "Typy podstawowe i interfejsy",
				content: "TypeScript dodaje silne typowanie do JavaScript...",
				order: 2,
				completed: true,
			},
			{
				id: 1203,
				courseId: 12,
				type: "video",
				title: "Klasy i dziedziczenie",
				content: "https://youtube.com/watch?v=...",
				duration: 20,
				order: 3,
				completed: false,
			},
			{
				id: 1204,
				courseId: 12,
				type: "video",
				title: "Generyki i typy zaawansowane",
				content: "https://youtube.com/watch?v=...",
				duration: 25,
				order: 4,
				completed: false,
			},
			{
				id: 1205,
				courseId: 12,
				type: "quiz",
				title: "Quiz - TypeScript",
				questions: [
					{
						id: 0,
						question: "Jaka jest przewaga TypeScript?",
						options: ["Szybkość", "Typy", "Rozmiar", "Brak"],
						correctAnswer: 1,
					},
					{
						id: 1,
						question: "Co to jest interface w TypeScript?",
						options: ["Klasa", "Kontrakt typów", "Funkcja", "Import"],
						correctAnswer: 1,
					},
				],
				passingScore: 70,
				order: 5,
			},
		],
	};

	// Struktura komentarzy dla lekcji każdego kursu
	const courseComments = {
		1: [
			// JavaScript
			{
				id: 1,
				lessonId: 103,
				courseId: 1,
				user: "Krzysztof K.",
				userAvatar: "https://i.pravatar.cc/150?img=12",
				content: "Świetne wyjaśnienie Promises! Teraz rozumiem jak działają.",
				createdAt: "2025-01-02 14:30",
				likes: 15,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 2,
				lessonId: 103,
				courseId: 1,
				user: "Julia M.",
				userAvatar: "https://i.pravatar.cc/150?img=9",
				content:
					"Polecam też obejrzeć: https://javascript.info/promise - świetna dokumentacja",
				createdAt: "2025-01-02 12:15",
				likes: 32,
				isLiked: true,
				isCommunityNote: true,
				approvedBy: "Jan Kowalski",
				pendingApproval: false,
			},
		],
		2: [
			// React
			{
				id: 3,
				lessonId: 203,
				courseId: 2,
				user: "Anna S.",
				userAvatar: "https://i.pravatar.cc/150?img=15",
				content: "Czy można używać Hooks poza render time?",
				createdAt: "2025-01-01 18:45",
				likes: 8,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 4,
				lessonId: 203,
				courseId: 2,
				user: "Piotr W.",
				userAvatar: "https://i.pravatar.cc/150?img=18",
				content: "Świetna seria o Hooks! Czekam na odc o useContext.",
				createdAt: "2025-01-01 16:20",
				likes: 18,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
		],
		3: [
			// Python
			{
				id: 5,
				lessonId: 302,
				courseId: 3,
				user: "Tomasz K.",
				userAvatar: "https://i.pravatar.cc/150?img=22",
				content:
					"Python jest o wiele łatwiejszy niż myślałem! Dziękuję za wyjaśnienia.",
				createdAt: "2025-01-02 10:30",
				likes: 22,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 6,
				lessonId: 303,
				courseId: 3,
				user: "Magda L.",
				userAvatar: "https://i.pravatar.cc/150?img=25",
				content:
					"Spróbowałem rozszerzenia pylint - bardzo polecam dla debugowania",
				createdAt: "2025-01-01 15:00",
				likes: 28,
				isLiked: true,
				isCommunityNote: true,
				approvedBy: "Piotr Wiśniewski",
				pendingApproval: false,
			},
			{
				id: 13,
				lessonId: 302,
				courseId: 3,
				user: "Łukasz S.",
				userAvatar: "https://i.pravatar.cc/150?img=44",
				content:
					"Ważne: Użycie list comprehension zamiast pętli for jest bardziej Pythonic i szybsze. Na przykład: [x*2 for x in range(10)] zamiast petli for.",
				createdAt: "2025-01-02 16:45",
				likes: 31,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: true,
			},
			{
				id: 14,
				lessonId: 303,
				courseId: 3,
				user: "Natalia B.",
				userAvatar: "https://i.pravatar.cc/150?img=47",
				content:
					"Dodatkowy zasób: https://docs.python.org/3/tutorial/datastructures.html - oficjalna dokumentacja struktur danych w Pythonie",
				createdAt: "2025-01-02 15:20",
				likes: 26,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: true,
			},
		],
		4: [
			// Node.js
			{
				id: 7,
				lessonId: 403,
				courseId: 4,
				user: "Michał R.",
				userAvatar: "https://i.pravatar.cc/150?img=28",
				content: "Express jest fajny, ale kiedy przejdziemy na Fastify?",
				createdAt: "2025-01-02 09:15",
				likes: 12,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 8,
				lessonId: 403,
				courseId: 4,
				user: "Ewelina P.",
				userAvatar: "https://i.pravatar.cc/150?img=31",
				content: "Najlepsze wyjaśnienie middleware. Wreszcie to rozumiem!",
				createdAt: "2025-01-01 20:45",
				likes: 35,
				isLiked: false,
				isCommunityNote: true,
				approvedBy: "Tomasz Zieliński",
				pendingApproval: false,
			},
			{
				id: 15,
				lessonId: 404,
				courseId: 4,
				user: "Adrian G.",
				userAvatar: "https://i.pravatar.cc/150?img=50",
				content:
					"Pro tip: Zawsze używaj express.json() middleware przed definiowaniem routes aby poprawnie parsować request body. Zaoszczędzem sobie wielu błędów dzięki tej wskazówce.",
				createdAt: "2025-01-02 17:30",
				likes: 29,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: true,
			},
		],
		5: [
			// UI/UX
			{
				id: 9,
				lessonId: 502,
				courseId: 5,
				user: "Zofia N.",
				userAvatar: "https://i.pravatar.cc/150?img=35",
				content: "Figma ma zbyt stromą krzywą uczenia się dla mnie.",
				createdAt: "2025-01-02 08:30",
				likes: 5,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 10,
				lessonId: 503,
				courseId: 5,
				user: "Robert J.",
				userAvatar: "https://i.pravatar.cc/150?img=38",
				content: "Wireframing to kluczowy skill! Świetnie to pokazałaś.",
				createdAt: "2025-01-01 14:20",
				likes: 19,
				isLiked: true,
				isCommunityNote: false,
				pendingApproval: false,
			},
		],
		6: [
			// Cybersecurity
			{
				id: 11,
				lessonId: 602,
				courseId: 6,
				user: "Mateusz W.",
				userAvatar: "https://i.pravatar.cc/150?img=41",
				content: "2FA jest obowiązkowe! Wszyscy powinni to znać.",
				createdAt: "2025-01-02 11:00",
				likes: 24,
				isLiked: false,
				isCommunityNote: true,
				approvedBy: "Krzysztof Nowak",
				pendingApproval: false,
			},
			{
				id: 12,
				lessonId: 603,
				courseId: 6,
				user: "Natalia S.",
				userAvatar: "https://i.pravatar.cc/150?img=44",
				content: "Czy AES-256 jest wystarczający dla danych osobowych?",
				createdAt: "2025-01-01 17:30",
				likes: 7,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
		],
		7: [
			// SQL
			{
				id: 13,
				lessonId: 703,
				courseId: 7,
				user: "Bartosz M.",
				userAvatar: "https://i.pravatar.cc/150?img=47",
				content: "LEFT JOIN vs INNER JOIN - teraz to rozumiem!",
				createdAt: "2025-01-02 13:45",
				likes: 31,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 14,
				lessonId: 704,
				courseId: 7,
				user: "Lidia K.",
				userAvatar: "https://i.pravatar.cc/150?img=50",
				content:
					"Indeksy zmniejszyły moje zapytania z 5s do 50ms. Niesamowite!",
				createdAt: "2025-01-01 19:10",
				likes: 42,
				isLiked: true,
				isCommunityNote: true,
				approvedBy: "Magdalena Kowalska",
				pendingApproval: false,
			},
		],
		8: [
			// Advanced Security
			{
				id: 15,
				lessonId: 802,
				courseId: 8,
				user: "Szymon G.",
				userAvatar: "https://i.pravatar.cc/150?img=53",
				content: "IDS vs IPS - różnice wreszcie jasne!",
				createdAt: "2025-01-02 16:00",
				likes: 11,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 16,
				lessonId: 803,
				courseId: 8,
				user: "Marta D.",
				userAvatar: "https://i.pravatar.cc/150?img=56",
				content: "Zaraz testuję VPN na własnej infrastrukturze. Dziękuję!",
				createdAt: "2025-01-01 21:30",
				likes: 9,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: true,
			},
		],
		9: [
			// Vue.js
			{
				id: 17,
				lessonId: 902,
				courseId: 9,
				user: "Dominik H.",
				userAvatar: "https://i.pravatar.cc/150?img=59",
				content:
					"Reactivity w Vue jest eleganckie! Teraz rozumiem dlaczego ludzie to lubią.",
				createdAt: "2025-01-02 12:30",
				likes: 25,
				isLiked: true,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 18,
				lessonId: 903,
				courseId: 9,
				user: "Elena C.",
				userAvatar: "https://i.pravatar.cc/150?img=62",
				content:
					"Slots to potężny feature. Polecam też odczytać o scoped slots.",
				createdAt: "2025-01-01 13:15",
				likes: 20,
				isLiked: false,
				isCommunityNote: true,
				approvedBy: "Katarzyna Szymańska",
				pendingApproval: false,
			},
		],
		10: [
			// MongoDB
			{
				id: 19,
				lessonId: 1002,
				courseId: 10,
				user: "Konrad Z.",
				userAvatar: "https://i.pravatar.cc/150?img=65",
				content: "MongoDB nie potrzebuje schemy? To wygodne ale ryzykowne.",
				createdAt: "2025-01-02 14:00",
				likes: 16,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 20,
				lessonId: 1003,
				courseId: 10,
				user: "Alicja B.",
				userAvatar: "https://i.pravatar.cc/150?img=68",
				content:
					"Operatory $gt, $lt - świetne wyjaśnienie! Teraz piszę zaawansowane queries.",
				createdAt: "2025-01-01 11:45",
				likes: 33,
				isLiked: true,
				isCommunityNote: true,
				approvedBy: "Paweł Dabrowski",
				pendingApproval: false,
			},
		],
		11: [
			// Penetration Testing
			{
				id: 21,
				lessonId: 1102,
				courseId: 11,
				user: "Adrian F.",
				userAvatar: "https://i.pravatar.cc/150?img=71",
				content: "Ethical hacking to odpowiedzialne podejście. Super kurs!",
				createdAt: "2025-01-02 15:20",
				likes: 13,
				isLiked: false,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 22,
				lessonId: 1103,
				courseId: 11,
				user: "Sylwia T.",
				userAvatar: "https://i.pravatar.cc/150?img=74",
				content:
					"Narzędzia: Metasploit jest złożony ale potężny. Dobrze go wyjaśniłeś.",
				createdAt: "2025-01-01 10:30",
				likes: 28,
				isLiked: false,
				isCommunityNote: true,
				approvedBy: "Marcin Sikora",
				pendingApproval: false,
			},
		],
		12: [
			// TypeScript
			{
				id: 23,
				lessonId: 1202,
				courseId: 12,
				user: "Kamil V.",
				userAvatar: "https://i.pravatar.cc/150?img=77",
				content:
					"TypeScript ratuje mnie przed błędami! Dlaczego nie nauczyłem się wcześniej?",
				createdAt: "2025-01-02 10:15",
				likes: 37,
				isLiked: true,
				isCommunityNote: false,
				pendingApproval: false,
			},
			{
				id: 24,
				lessonId: 1203,
				courseId: 12,
				user: "Ewa U.",
				userAvatar: "https://i.pravatar.cc/150?img=80",
				content: "Klasy w TS to moc. Wreszcie mam dostęp do OOP w JavaScript!",
				createdAt: "2025-01-01 09:00",
				likes: 29,
				isLiked: false,
				isCommunityNote: true,
				approvedBy: "Zofia Nowak",
				pendingApproval: false,
			},
		],
	};

	// Pobierz kurs z location.state lub znajdź go na podstawie courseId
	const courseFromState = location.state?.course;
	const courseFromAllCourses = allCourses.find(
		c => c.id === parseInt(courseId)
	);
	const courseMetadata = courseFromState || courseFromAllCourses;

	// Stan użytkownika (w praktyce z AuthContext)
	const [currentUser] = useState({
		id: 1,
		name: "Jan Kowalski",
		role: "author", // 'student' lub 'author'
		isInstructor: true, // czy jest autorem tego kursu
	});

	// Mock user - w prawdziwej aplikacji z useAuth()
	const mockUser = {
		id: 1,
		email: "anna.nowak@example.com",
		role: "author", // student, author, admin
	};

	// Pobranie lekcji dla wybranego kursu
	const courseIdInt = parseInt(courseId);
	const courseLessonsForCurrentCourse =
		courseLessons[courseIdInt] || courseLessons[2];
	const courseCommentsForCurrentCourse =
		courseComments[courseIdInt] || courseComments[2];

	// Przykładowe dane kursu (merge z metadanymi)
	const course = {
		id: courseId,
		title:
			courseMetadata?.title || "React.js - Tworzenie nowoczesnych aplikacji",
		instructor: courseMetadata?.instructor || "Anna Nowak",
		instructorEmail:
			courseMetadata?.instructorEmail || "anna.nowak@example.com",
		lessons: courseLessonsForCurrentCourse,
	};

	const [selectedLesson, setSelectedLesson] = useState(course.lessons[0]);
	const [commentText, setCommentText] = useState("");
	const [isSendingComment, setIsSendingComment] = useState(false);

	// Hook do śledzenia postępu kursu
	const { markLessonAsCompleted, markQuizAsCompleted, getCourseProgress } =
		useCourseProgress();

	// Komentarze dla wybranego kursu
	const [comments, setComments] = useState(courseCommentsForCurrentCourse);

	// Filtruj komentarze dla wybranej lekcji
	const lessonComments = comments.filter(c => c.lessonId === selectedLesson.id);

	// Sortuj: najpierw community notes, potem według liczby polubień
	const sortedComments = [...lessonComments].sort((a, b) => {
		if (a.isCommunityNote && !b.isCommunityNote) return -1;
		if (!a.isCommunityNote && b.isCommunityNote) return 1;
		return b.likes - a.likes;
	});

	const handleSendComment = async e => {
		e.preventDefault();

		if (!commentText.trim()) {
			toast.error("Wpisz treść komentarza");
			return;
		}

		setIsSendingComment(true);

		try {
			// API call
			// await fetch(`/api/courses/${courseId}/lessons/${selectedLesson.id}/comments`, {
			//     method: 'POST',
			//     body: JSON.stringify({ content: commentText })
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 500));

			const newComment = {
				id: Date.now(),
				lessonId: selectedLesson.id,
				user: "Ty",
				userAvatar: "https://i.pravatar.cc/150?img=1",
				content: commentText,
				createdAt: new Date().toLocaleString("pl-PL"),
				likes: 0,
				isLiked: false,
				isCommunityNote: false,
			};

			setComments([...comments, newComment]);
			setCommentText("");
			toast.success("Komentarz dodany!");
		} catch (error) {
			toast.error("Nie udało się dodać komentarza");
		} finally {
			setIsSendingComment(false);
		}
	};

	const handleLikeComment = commentId => {
		setComments(
			comments.map(c =>
				c.id === commentId
					? {
							...c,
							isLiked: !c.isLiked,
							likes: c.isLiked ? c.likes - 1 : c.likes + 1,
					  }
					: c
			)
		);
	};

	const handleMarkAsCompleted = () => {
		// Oznacz lekcję jako ukończoną w kontekście
		markLessonAsCompleted(parseInt(courseId), selectedLesson.id);

		// Jeśli to quiz, oznacz kurs jako 100% zaliczony
		if (selectedLesson.type === "quiz") {
			markQuizAsCompleted(parseInt(courseId));
			toast.success("Quiz ukończony! Kurs został oznaczony jako zaliczony!");
		} else {
			toast.success("Lekcja oznaczona jako ukończona!");
		}
		// API call: POST /api/courses/${courseId}/lessons/${selectedLesson.id}/complete
	};

	// Zaproponuj komentarz jako notka społeczności (student)
	const handleProposeAsCommunityNote = commentId => {
		setComments(
			comments.map(c =>
				c.id === commentId ? { ...c, pendingApproval: true } : c
			)
		);
		toast.success("Komentarz zaproponowany jako notka społeczności!");
		// API call: POST /api/comments/${commentId}/propose
	};

	// Zatwierdź komentarz jako notka społeczności (autor)
	const handleApproveCommunityNote = async commentId => {
		try {
			// API call
			// await fetch(`/api/comments/${commentId}/approve`, {
			//     method: 'POST'
			// });

			setComments(
				comments.map(c =>
					c.id === commentId
						? {
								...c,
								isCommunityNote: true,
								pendingApproval: false,
								approvedBy: course.instructor,
						  }
						: c
				)
			);
			toast.success("Komentarz zatwierdzony jako notka społeczności!");
		} catch (error) {
			toast.error("Nie udało się zatwierdzić komentarza");
		}
	};

	// Odrzuć propozycję notki społeczności (autor)
	const handleRejectCommunityNote = commentId => {
		setComments(
			comments.map(c =>
				c.id === commentId ? { ...c, pendingApproval: false } : c
			)
		);
		toast.info("Propozycja odrzucona");
		// API call: POST /api/comments/${commentId}/reject
	};

	// Zatwierdź komentarz jako notka społeczności (tylko dla autora)
	const approveCommunityNote = async commentId => {
		try {
			// API call
			// await fetch(`/api/comments/${commentId}/approve`, {
			//     method: 'POST'
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 300));

			setComments(
				comments.map(c =>
					c.id === commentId
						? {
								...c,
								isCommunityNote: true,
								approvedBy: course.instructor,
						  }
						: c
				)
			);

			toast.success("Komentarz zatwierdzony jako notka społeczności!");
		} catch (error) {
			toast.error("Nie udało się zatwierdzić komentarza");
		}
	};

	// Cofnij zatwierdzenie notki społeczności
	const revokeCommunityNote = async commentId => {
		if (
			!confirm(
				"Czy na pewno chcesz cofnąć zatwierdzenie tej notki społeczności?"
			)
		) {
			return;
		}

		try {
			// API call
			// await fetch(`/api/comments/${commentId}/revoke`, {
			//     method: 'POST'
			// });

			// Symulacja
			await new Promise(resolve => setTimeout(resolve, 300));

			setComments(
				comments.map(c =>
					c.id === commentId
						? {
								...c,
								isCommunityNote: false,
								approvedBy: null,
						  }
						: c
				)
			);

			toast.success("Zatwierdzenie cofnięte");
		} catch (error) {
			toast.error("Nie udało się cofnąć zatwierdzenia");
		}
	};

	// Sprawdź czy zalogowany użytkownik jest autorem kursu
	const _isAuthor = mockUser.email === course.instructorEmail;

	return (
		<div className='coursePlayer min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white border-b sticky top-0 z-10'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4'>
					<div className='flex items-center justify-between gap-3 sm:gap-4'>
						<div className='flex items-center gap-2 sm:gap-3 min-w-0'>
							<div className='min-w-0'>
								<h1 className='text-base sm:text-lg font-bold text-gray-900 truncate'>
									{course.title}
								</h1>
								<p className='text-xs text-gray-600 truncate'>
									Instruktor: {course.instructor}
								</p>
							</div>
						</div>
						<Button
							variant='outline_border'
							size='md'
							className='text-xs sm:text-sm flex-shrink-0'
							onClick={() => navigate("/dashboard")}>
							<ArrowLeft className='h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2' />
							<span className='hidden sm:inline'>Powrót</span>
							<span className='sm:hidden'>Wróć</span>
						</Button>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6'>
					{/* Główna zawartość - Player + Comments */}
					<div className='lg:col-span-2 space-y-4 sm:space-y-6'>
						{/* Player / Content Display */}
						<Card className='overflow-hidden'>
							{selectedLesson.type === "quiz" ? (
								<Card className='overflow-hidden p-4 sm:p-6 lg:p-8'>
									<QuizDisplay
										lesson={selectedLesson}
										onComplete={handleMarkAsCompleted}
									/>
								</Card>
							) : selectedLesson.type === "video" ? (
								<>
									{/* Video Player */}
									<div className='aspect-video bg-gray-900 flex items-center justify-center relative'>
										<div className='absolute inset-0 flex items-center justify-center'>
											<div className='text-center'>
												<div className='bg-blue-600 rounded-full p-6 mx-auto mb-4 inline-flex'>
													<Play className='h-12 w-12 text-white' />
												</div>
												<p className='text-white text-lg font-semibold'>
													{selectedLesson.title}
												</p>
												<p className='text-gray-300 text-sm'>
													Kliknij aby odtworzyć
												</p>
											</div>
										</div>
									</div>
									{/* Video Controls Bar */}
									<div className='bg-gray-100 p-4 border-t'>
										<div className='flex items-center justify-between text-sm text-gray-600'>
											<span>0:00 / {selectedLesson.duration}:00</span>
											<div className='flex items-center gap-2'>
												<Clock className='h-4 w-4' />
												<span>{selectedLesson.duration} min</span>
											</div>
										</div>
									</div>
								</>
							) : (
								<>
									{/* Text Content Display */}
									<div className='p-8 bg-white'>
										<div className='flex items-center gap-3 mb-6'>
											<div className='p-3 rounded-lg bg-purple-100'>
												<FileText className='h-6 w-6 text-purple-600' />
											</div>
											<div>
												<h2 className='text-2xl font-bold text-gray-900'>
													{selectedLesson.title}
												</h2>
												<p className='text-sm text-gray-600'>
													Plansza tekstowa
												</p>
											</div>
										</div>
										<div className='prose prose-lg max-w-none'>
											<p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
												{selectedLesson.content}
											</p>
										</div>
									</div>
								</>
							)}
						</Card>

						{/* Lesson Info + Navigation */}
						<Card className='p-6'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-xl font-bold text-gray-900'>
									{selectedLesson.title}
								</h3>
								{selectedLesson.completed ? (
									<Badge className='bg-green-600'>
										<CheckCircle className='h-3 w-3 mr-1' />
										Ukończone
									</Badge>
								) : (
									<Button
										size='sm'
										variant='outline'
										onClick={handleMarkAsCompleted}>
										<CheckCircle className='h-4 w-4 mr-2' />
										Oznacz jako ukończone
									</Button>
								)}
							</div>

							{/* Navigation Buttons */}
							<div className='flex gap-3 pt-4 border-t'>
								<Button
									variant='outline'
									className='flex-1'
									disabled={selectedLesson.order === 1}
									onClick={() => {
										const prevLesson = course.lessons.find(
											l => l.order === selectedLesson.order - 1
										);
										if (prevLesson) setSelectedLesson(prevLesson);
									}}>
									← Poprzednia lekcja
								</Button>
								<Button
									variant='default'
									className='flex-1 bg-blue-600 hover:bg-blue-700'
									disabled={selectedLesson.order === course.lessons.length}
									onClick={() => {
										const nextLesson = course.lessons.find(
											l => l.order === selectedLesson.order + 1
										);
										if (nextLesson) setSelectedLesson(nextLesson);
									}}>
									Następna lekcja →
								</Button>
							</div>
						</Card>

						{/* Comments Section */}
						<Card className='p-6'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
								<MessageSquare className='h-5 w-5' />
								Komentarze ({lessonComments.length})
							</h3>

							{/* Add Comment Form */}
							<form onSubmit={handleSendComment} className='mb-6'>
								<textarea
									rows={3}
									placeholder='Dodaj komentarz do tej lekcji...'
									value={commentText}
									onChange={e => setCommentText(e.target.value)}
									className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-2'
								/>
								<div className='flex justify-between items-center'>
									<p className='text-xs text-gray-500'>
										{commentText.length} / 500 znaków
									</p>
									<Button
										type='submit'
										size='sm'
										disabled={isSendingComment || !commentText.trim()}
										className='bg-blue-600 hover:bg-blue-700'>
										{isSendingComment ? (
											<>
												<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
												Wysyłanie...
											</>
										) : (
											<>
												<Send className='h-4 w-4 mr-2' />
												Dodaj komentarz
											</>
										)}
									</Button>
								</div>
							</form>

							{/* Comments List */}
							<div className='space-y-4'>
								{sortedComments.length === 0 ? (
									<div className='text-center py-8 text-gray-500'>
										<MessageSquare className='h-12 w-12 mx-auto mb-2 opacity-50' />
										<p>Brak komentarzy do tej lekcji</p>
										<p className='text-sm'>Bądź pierwszy!</p>
									</div>
								) : (
									sortedComments.map(comment => (
										<div
											key={comment.id}
											className={`
												rounded-lg p-4 
												${
													comment.isCommunityNote
														? "bg-blue-50 border-2 border-blue-200"
														: "bg-gray-50"
												}
											`}>
											{/* Community Note Badge */}
											{comment.isCommunityNote && (
												<div className='mb-3'>
													<Badge className='bg-blue-600'>
														<Star className='h-3 w-3 mr-1' />
														Notka społeczności
													</Badge>
													<p className='text-xs text-blue-700 mt-1'>
														Zatwierdzone przez {comment.approvedBy}
													</p>
												</div>
											)}

											{/* User Info */}
											<div className='flex items-start gap-3'>
												<img
													src={comment.userAvatar}
													alt={comment.user}
													className='h-10 w-10 rounded-full'
												/>
												<div className='flex-1'>
													<div className='flex items-center justify-between mb-2'>
														<div>
															<p className='font-semibold text-gray-900'>
																{comment.user}
															</p>
															<p className='text-xs text-gray-500'>
																{comment.createdAt}
															</p>
														</div>
													</div>

													{/* Comment Content */}
													<p className='text-sm text-gray-700 mb-3'>
														{comment.content}
													</p>

													{/* Comment Actions */}
													<div className='flex items-center gap-4'>
														<button
															onClick={() => handleLikeComment(comment.id)}
															className={`
																flex items-center gap-1 text-sm transition-colors
																${
																	comment.isLiked
																		? "text-blue-600 font-semibold"
																		: "text-gray-600 hover:text-blue-600"
																}
															`}>
															<ThumbsUp
																className={`h-4 w-4 ${
																	comment.isLiked ? "fill-blue-600" : ""
																}`}
															/>
															<span>{comment.likes}</span>
														</button>

														{/* Przycisk dla studenta - zaproponuj jako notka */}
														{currentUser.role === "student" &&
															!comment.isCommunityNote &&
															!comment.pendingApproval && (
																<Button
																	size='sm'
																	variant='outline'
																	onClick={() =>
																		handleProposeAsCommunityNote(comment.id)
																	}>
																	<Star className='h-3 w-3 mr-1' />
																	Zaproponuj jako notka
																</Button>
															)}

														{/* Status oczekiwania dla studenta */}
														{comment.pendingApproval &&
															currentUser.role === "student" && (
																<Badge
																	variant='secondary'
																	className='bg-yellow-100 text-yellow-800'>
																	<Clock className='h-3 w-3 mr-1' />
																	Oczekuje na zatwierdzenie
																</Badge>
															)}

														{/* Przyciski dla autora - zatwierdź/odrzuć */}
														{currentUser.role === "author" &&
															currentUser.isInstructor &&
															!comment.isCommunityNote &&
															comment.pendingApproval && (
																<div className='flex gap-2'>
																	<Button
																		size='sm'
																		className='bg-green-600 hover:bg-green-700'
																		onClick={() =>
																			handleApproveCommunityNote(comment.id)
																		}>
																		<CheckCircle className='h-3 w-3 mr-1' />
																		Zatwierdź
																	</Button>
																	<Button
																		size='sm'
																		variant='outline'
																		onClick={() =>
																			handleRejectCommunityNote(comment.id)
																		}>
																		<XCircle className='h-3 w-3 mr-1' />
																		Odrzuć
																	</Button>
																</div>
															)}
													</div>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</Card>
					</div>

					{/* Sidebar - Lesson List */}
					<div className='lg:col-span-1'>
						<Card className='sticky top-24'>
							<div className='p-4 border-b bg-gray-50'>
								<h3 className='font-semibold text-gray-900'>Lista lekcji</h3>
								<p className='text-sm text-gray-600'>
									{course.lessons.filter(l => l.completed).length} /{" "}
									{course.lessons.length} ukończone
								</p>
							</div>

							{/* Lessons List */}
							<div className='max-h-[600px] overflow-y-auto'>
								{course.lessons.map((lesson, index) => {
									const isActive = selectedLesson.id === lesson.id;
									const Icon = lesson.type === "video" ? Play : FileText;

									return (
										<button
											key={lesson.id}
											onClick={() => setSelectedLesson(lesson)}
											className={`
												w-full text-left p-4 border-b transition-colors
												${
													isActive
														? "bg-blue-50 border-l-4 border-l-blue-600"
														: "hover:bg-gray-50 border-l-4 border-l-transparent"
												}
											`}>
											<div className='flex items-start gap-3'>
												{/* Lesson Icon */}
												<div
													className={`
														p-2 rounded flex-shrink-0
														${
															isActive
																? lesson.type === "video"
																	? "bg-blue-100"
																	: "bg-purple-100"
																: "bg-gray-100"
														}
													`}>
													<Icon
														className={`
															h-4 w-4
															${
																isActive
																	? lesson.type === "video"
																		? "text-blue-600"
																		: "text-purple-600"
																	: "text-gray-600"
															}
														`}
													/>
												</div>

												{/* Lesson Info */}
												<div className='flex-1 min-w-0'>
													<p
														className={`
															text-sm font-medium mb-1
															${isActive ? "text-blue-600" : "text-gray-900"}
														`}>
														{index + 1}. {lesson.title}
													</p>
													<div className='flex items-center gap-2 text-xs text-gray-600'>
														{lesson.type === "video" && (
															<>
																<Clock className='h-3 w-3' />
																<span>{lesson.duration} min</span>
															</>
														)}
														{lesson.completed && (
															<Badge
																variant='secondary'
																className='bg-green-100 text-green-800'>
																<CheckCircle className='h-3 w-3' />
															</Badge>
														)}
													</div>
												</div>

												{isActive && (
													<ChevronRight className='h-5 w-5 text-blue-600 flex-shrink-0' />
												)}
											</div>
										</button>
									);
								})}
							</div>

							{/* Progress Bar */}
							<div className='p-4 border-t bg-gray-50'>
								<div className='flex justify-between text-sm mb-2'>
									<span className='text-gray-600'>Postęp kursu</span>
									<span className='font-semibold text-gray-900'>
										{getCourseProgress(
											parseInt(courseId),
											course.lessons.length
										)}
										%
									</span>
								</div>
								<div className='w-full bg-gray-200 rounded-full h-2'>
									<div
										className='bg-blue-600 h-2 rounded-full transition-all'
										style={{
											width: `${getCourseProgress(
												parseInt(courseId),
												course.lessons.length
											)}%`,
										}}></div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
