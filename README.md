# Simple Task Tracker

## Autor
Kacper Podolski, nr albumu: 94675

## Opis projektu
Aplikacja "Simple Task Tracker" to lekkie i intuicyjne narzędzie chmurowe do zarządzania codziennymi zadaniami. Projekt stawia na prostotę i minimalizm, stanowiąc świetną bazę do nauki budowania aplikacji cloud-native. Aplikacja została zaprojektowana w nowoczesnej architekturze trójwarstwowej.

Narzędzie umożliwia użytkownikom podstawowe operacje na danych oraz bezpieczne zarządzanie własną listą zadań.

Użytkownik może:
- zarejestrować konto w systemie,
- zalogować się do aplikacji,
- dodawać nowe zadania (CREATE),
- przeglądać przypisane do niego zadania (READ),
- edytować zadania oraz oznaczać je jako wykonane (UPDATE),
- usuwać zbędne zadania (DELETE).

## Stos technologiczny
- **Frontend:** React + Vite
- **Backend:** Node.js (Express)
- **Baza danych:** Azure Cosmos DB
- **Repozytorium:** GitHub

## Azure Mapping (mapowanie na usługi Azure)

| Warstwa / Komponent | Środowisko Lokalne | Azure (propozycja wdrożenia) |
| :--- | :--- | :--- |
| **Frontend (UI)** | React + Vite (port 5173) | Azure Static Web Apps |
| **Backend (API)** | Node.js + Express (port 3000) | Azure App Service (Web App) |
| **Baza danych** | Emulator lokalny | Azure Cosmos DB (API for NoSQL) |
| **Zarządzanie kodem i CI/CD** | Git / GitHub | GitHub Actions |
## 🚦 Status Projektu
* [x] **Artefakt 1:** Architektura i struktura folderów.
* [x] **Artefakt 2:** Środowisko wielokontenerowe uruchomione lokalnie (Docker Compose).
* [x] **Artefakt 3:** Działająca warstwa prezentacji (React + Vite w Dockerze).
* [x] **Artefakt 4:** Działająca warstwa logiki backendu (Node.js + połączenie z DB).
* [x] **Artefakt 5:** Zastosowanie wzorca DTO, trwałość bazy danych (Volumes) i skrypty startowe.
* [x] **Artefakt 6:** Wdrożenie aplikacji w chmurze Azure
- [x] 6.1 Utworzenie i konfiguracja bazy danych Azure Cosmos DB (API for MongoDB) oraz zapory sieciowej.
  - [x] 6.2 Aktualizacja konfiguracji połączenia i test lokalny z chmurą.
  - [x] 6.3 Wdrożenie API do Azure App Service.
  - [x] 6.4 Wdrożenie Frontendu i połączenie z chmurowym API.
* [x] **Artefakt 7:** Wdrożenie Azure Key Vault i Tożsamości Zarządzanej (Managed Identity) – eliminacja twardych haseł z kodu.
* [x] **Artefakt 8:**  Wybudowany “bezpiecznik” i wdrożony automatu CI/CD.
  ## 🌍 Środowisko Produkcyjne (Live)
* **Frontend (Aplikacja Webowa):** [tasktrackerfront94675.z1.web.core.windows.net](https://tasktrackerfront94675.z1.web.core.windows.net/)
* **Backend (Punkt końcowy API):** [task-tracker-api-94675...azurewebsites.net/api/tasks](https://task-tracker-api-94675-cgamhdbyaxd7e2aa.germanywestcentral-01.azurewebsites.net/api/tasks)
*(Uwaga: Z powodu restrykcji regionalnych nałożonych na subskrypcję Azure for Students dotyczących usługi Static Web Apps, frontend został wdrożony z wykorzystaniem bezpiecznej alternatywy: Azure Storage Account)*