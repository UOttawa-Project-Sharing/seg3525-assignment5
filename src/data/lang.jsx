import React from "react";

const translations = {
  en: {
        loading: "Loading...",
      navbar: {
          home : "Home",
          about : "About",
          dashboard: "Dashboard",
      },
      home: {
          title: "Welcome to GP-Statz",
          description: "Your interactive MotoGP dashboard to be a real pro fan.",
          description2: "Explore rider stats, team performance, and race history. Stay updated and become a MotoGP expert!",
          top: "Current Best Riders",
          riderCard: {
              constructor: "Constructor",
              podiums: "Podiums",
              position: "Position",
                wins: "Wins",
          }
      },
      footer: {
          text: "All rights reserved.",
          description: "All data was fetched from the official MotoGP API.",
      },
      about: {
          sections: [
              {
                  title: "Project Overview",
                  icon: "bi-bar-chart-fill text-primary",
                  color: "primary",
                  content: (
                      <p>
                          <b>GP-Statz</b> is a bilingual MotoGP dashboard built with <b>React</b> and <b>Recharts</b>. It delivers fast, interactive, and visually engaging statistics for fans, with a crisp interface and seamless English/French support.
                      </p>
                  ),
              },
              {
                  title: "Features",
                  icon: "bi-stars text-warning",
                  color: "warning",
                  content: (
                      <ul className="about-list">
                          <li><i className="bi bi-graph-up-arrow text-success me-2"></i> Interactive MotoGP charts & stats</li>
                          <li><i className="bi bi-translate text-info me-2"></i> Bilingual: English &amp; French</li>
                          <li><i className="bi bi-arrow-repeat text-primary me-2"></i> Live data from the official MotoGP API</li>
                          <li><i className="bi bi-sliders2-vertical text-warning me-2"></i> Customizable data with filtering</li>
                          <li><i className="bi bi-universal-access text-danger me-2"></i> Responsive &amp; accessible UI</li>
                      </ul>
                  ),
              },
              {
                  title: "Technologies",
                  icon: "bi-cpu text-info",
                  color: "info",
                  content: (
                      <ul className="about-list">
                          <li><i className="bi bi-filetype-jsx me-2 text-primary"></i> React (UI framework)</li>
                          <li><i className="bi bi-bar-chart-steps me-2 text-success"></i> Recharts (Data visualization)</li>
                          <li><i className="bi bi-bootstrap-fill me-2 text-purple"></i> React-Bootstrap (Layout & styling)</li>
                          <li><i className="bi bi-cloud-arrow-down me-2 text-info"></i> Axios (API fetching)</li>
                          <li><i className="bi bi-brush me-2 text-warning"></i> SASS (Advanced styling)</li>
                      </ul>
                  ),
              },
              {
                  title: "Course Context",
                  icon: "bi-mortarboard-fill text-success",
                  color: "success",
                  content: (
                      <p>
                          Developed for <b>SEG3525</b> at the University of Ottawa, GP-Statz demonstrates excellence in interactive data visualization and internationalization as a modern, academic web project.
                      </p>
                  ),
              },
          ],
          shortDesc: "The interactive MotoGP dashboard for fans.",
          tagLine: "SEG3525 - University of Ottawa",
      },
      widgets: {
            riderStats: {
                title: "Rider Statistics",
                shortTitle: "Rider Stats",
                totalRaces: "Total Races",
                podiums: "Podiums",
                wins: "Wins",
            },
          milestones: {
                title: "Rider Milestones",
                shortTitle: "Milestones",
                firstRace: "First Race",
                firstPodium: "First Podium",
                firstWin: "First Win",
                lastWin: "Last Win",
                milestone: "Milestone",
                year: "Year",
                category: "Category",
                event: "Event",
                emptyDropdown: "Any Category",
              dropLabel: "Select Category",
                noMilestones: "No milestones found for this category.",
          },
          riderProfile: {
                title: "Rider Profile",
                shortTitle: "Profile",
              country: "Country",
                age: "Age",
              birthday: "Birthday",
              retiredIn: "Retired In",
                retired: "Retired",
                active: "Active",
              birthCity: "Birth City",
              category: "Category",
              startYear: "Start Year",
              EndYear: "End Year",
              noTeams: "No Current Team",
          },
          careerTimeline: {
                title: "Career Timeline",
                shortTitle: "Career Timeline",
              number: "Number",
                shortNickname: "Short Nickname",
                type: "Type",
                constructor: "Constructor",
                current: "Current",
                inGrid: "In Grid",
                test: "Tester",
                wildcard: "Wildcard",
                noCareerData: "No career data available.",
          },
          championshipsStandings: {
                title: "Championship Standings",
                shortTitle: "Standings",
              position: "Pos",
                points: "Points",
                rider: "Rider",
              team: "Team",
              podiums: "Podiums",
                wins: "Wins",
                noStandings: "No standings data available.",
          },
          nextEvent: {
                title: "Next Event",
                shortTitle: "Next Event",
                date: "Date",
                time: "Time",
                location: "Location",
                countdown: "Countdown",
                noEvent: "No upcoming events found.",
              eventStarted: "Event started",
            next: "Next Event",
            previous: "Previous Event",
          },
          seasonHistory: {
                title: "Season History",
                shortTitle: "Season History",
                year: "Year",
              statistics: "Statistics",
              position: "Position",
                points: "Points",
              champuionshipsPositions: "ChampionshipsPositions",
              podiums: "Podiums",
                wins: "Wins",
              raceStart: "Race Start",
              noData: "No season history data available for",
          },
          circuitInfo: {
                title: "Circuit Information",
                shortTitle: "Circuit Info",
                name: "Name",
              svg: "Circuit Track SVG",
              noTrackInfo: "No track info available.",
              trackDetails: "Track Details",
                length: "Length",
                width: "Width",
              longuestStraight: "Longest Straight",
                leftCorners: "Left Corners",
                rightCorners: "Right Corners",
              firstGridPosition: "First Grid Position",
              constructed: "Constructed",
              modified: "Modified",
              designer: "Designer",
                address: "Address",
              region: "Region",
              capacity: "Capacity",
          },
            circuitDescription: {
                    title: "Circuit Description",
                    shortTitle: "Circuit Description",
                    description: "Description",
                    noDescription: "No description available for this circuit.",
            },
          driverComparison: {
                title: "Driver Comparison",
                shortTitle: "Comparison",
                selectRider: "Select Rider",
                selectRider2: "Select Second Rider",
                compareButton: "Compare",
                stats: [
                    { key: 'wins', label: 'Wins' },
                    { key: 'podiums', label: 'Podiums' },
                    { key: 'totalRaces', label: 'Total Races' },
                ],
                noComparisonData: "No comparison data available.",

          },
      },
      dashboard: {
            clearWidget: "Clear Widget",
          selectRider: "Select Rider",
          selectYear: "Select Year",
          selectCategory: "Select Category",
          selectEvent: "Select Event",
          importLayout: "Import Layout",
            exportLayout: "Export Layout",
      }
  },
  fr: {
      loading: "Chargement...",
        navbar: {
            home : "Accueil",
            about : "À propos",
            dashboard: "Tableau de bord",
        },
        home: {
            title: "Bienvenue sur GP-Statz",
            description: "Votre tableau de bord interactif MotoGP pour être un vrai fan.",
            description2: "Explorez les statistiques des pilotes, les performances des équipes et l'historique des courses. Restez à jour et devenez un expert MotoGP !",
            top: "Meilleurs Pilotes Actuels",
            riderCard: {
                constructor: "Constructeur",
                podiums: "Podiums",
                position: "Position",
                wins: "Victoires",
            }
        },
        footer: {
            text: "Tous droits réservés.",
            description: "Toutes les données ont été récupérées depuis l'API officielle de MotoGP.",
        },
      about: {
            sections: [
                {
                    title: "Aperçu du Projet",
                    icon: "bi-bar-chart-fill text-primary",
                    color: "primary",
                    content: (
                        <p>
                            <b>GP-Statz</b> est un tableau de bord MotoGP bilingue construit avec <b>React</b> et <b>Recharts</b>. Il offre des statistiques rapides, interactives et visuellement engageantes pour les fans, avec une interface claire et un support fluide en anglais et en français.
                        </p>
                    ),
                },
                {
                    title: "Fonctionnalités",
                    icon: "bi-stars text-warning",
                    color: "warning",
                    content: (
                        <ul className="about-list">
                            <li><i className="bi bi-graph-up-arrow text-success me-2"></i> Graphiques & statistiques MotoGP interactifs</li>
                            <li><i className="bi bi-translate text-info me-2"></i> Bilingue : Anglais & Français</li>
                            <li><i className="bi bi-arrow-repeat text-primary me-2"></i> Données en direct depuis l'API officielle de MotoGP</li>
                            <li><i className="bi bi-sliders2-vertical text-warning me-2"></i> Données personnalisables avec filtrage</li>
                            <li><i className="bi bi-universal-access text-danger me-2"></i> Interface utilisateur réactive et accessible</li>
                        </ul>
                    ),
                },
                {
                    title: "Technologies",
                    icon: "bi-cpu text-info",
                    color: "info",
                    content: (
                        <ul className="about-list">
                            <li><i className="bi bi-filetype-jsx me-2 text-primary"></i> React (framework UI)</li>
                            <li><i className="bi bi-bar-chart-steps me-2 text-success"></i> Recharts (visualisation de données)</li>
                            <li><i className="bi bi-bootstrap-fill me-2 text-purple"></i> React-Bootstrap (mise en page et style)</li>
                            <li><i className="bi bi-cloud-arrow-down me-2 text-info"></i> Axios (récupération d'API)</li>
                            <li><i className="bi bi-brush me-2 text-warning"></i> SASS (style avancé)</li>
                        </ul>
                    ),
                },
                {
                    title: "Contexte du Cours",
                    icon: "bi-mortarboard-fill text-success",
                    color: "success",
                    content: (
                        <p>
                            Développé pour <b>SEG3525</b> à l'Université d'Ottawa, GP-Statz démontre l'excellence en visualisation de données interactive et en internationalisation en tant que projet web académique moderne.
                        </p>
                    ),
                },
            ],
            shortDesc: "Le tableau de bord MotoGP interactif pour les fans.",
            tagLine: "SEG3525 - Université d'Ottawa",
      },
        widgets: {
                riderStats: {
                    title: "Statistiques du Pilote",
                    shortTitle: "Statistiques du Pilote",
                    totalRaces: "Courses Totales",
                    podiums: "Podiums",
                    wins: "Victoires",
                },
            milestones: {
                title: "Jalons du Pilote",
                shortTitle: "Jalons",
                firstRace: "Première Course",
                firstPodium: "Premier Podium",
                firstWin: "Première Victoire",
                lastWin: "Dernière Victoire",
                milestone: "Jalon",
                year: "Année",
                category: "Catégorie",
                event: "Événement",
                emptyDropdown: "Toute Catégorie",
                dropLabel: "Sélectionner la Catégorie",
                noMilestones: "Aucun jalon trouvé pour cette catégorie.",
            },
            riderProfile: {
                title: "Profil du Pilote",
                shortTitle: "Profil",
                country: "Pays",
                age: "Âge",
                birthday: "Anniversaire",
                retiredIn: "Retraité en",
                retired: "Retraité",
                active: "Actif",
                birthCity: "Ville de Naissance",
                category: "Catégorie",
                startYear: "Année de Début",
                EndYear: "Année de Fin",
                noTeams: "Pas d'Équipe Actuelle",
            },
            careerTimeline: {
                title: "Chronologie de Carrière",
                shortTitle: "Carrière",
                number: "Numéro",
                shortNickname: "Surnom",
                type: "Type",
                constructor: "Constructeur",
                current: "Actuel",
                inGrid: "Dans la Grille",
                wildcard: "Joker",
                test: "Testeur",
                noCareerData: "Aucune donnée de carrière disponible.",
            },
            championshipsStandings: {
                title: "Classement du Championnat",
                shortTitle: "Classement",
                position: "Pos",
                points: "Points",
                rider: "Pilote",
                team: "Équipe",
                podiums: "Podiums",
                wins: "Victoires",
                noStandings: "Aucune donnée de classement disponible.",
            },
            nextEvent: {
                title: "Prochain Événement",
                shortTitle: "Prochain Événement",
                date: "Date",
                time: "Heure",
                location: "Lieu",
                countdown: "Compte à Rebours",
                noEvent: "Aucun événement à venir trouvé.",
                eventStarted: "L'événement a commencé",
                next: "Événement Suivant",
                previous: "Événement Précédent",
            },
            seasonHistory: {
                title: "Historique de Saison",
                shortTitle: "Historique de Saison",
                year: "Année",
                statistics: "Statistiques",
                position: "Position",
                points: "Points",
                champuionshipsPositions: "Positions du Championnat",
                podiums: "Podiums",
                wins: "Victoires",
                raceStart: "Début de la Course",
                noData: "Aucune donnée d'historique de saison disponible pour",
            },
            circuitInfo: {
                title: "Informations sur le Circuit",
                shortTitle: "Infos Circuit",
                name: "Nom",
                svg: "SVG du Circuit",
                noTrackInfo: "Aucune information de circuit disponible.",
                trackDetails: "Détails du Circuit",
                length: "Longueur",
                width: "Largeur",
                longuestStraight: "Ligne Droite la Plus Longue",
                leftCorners: "Virages à Gauche",
                rightCorners: "Virages à Droite",
                firstGridPosition: "Première Position de Grille",
                constructed: "Construit en",
                modified: "Modifié en",
                designer: "Designer",
                address: "Adresse",
                region: "Région",
                capacity: "Capacité",
            },
            circuitDescription: {
                title: "Description du Circuit",
                shortTitle: "Description du Circuit",
                description: "Description",
                noDescription: "Aucune description disponible pour ce circuit.",
            },
            driverComparison: {
                title: "Comparaison des Pilotes",
                shortTitle: "Comparaison",
                selectRider: "Sélectionner le Pilote",
                selectRider2: "Sélectionner le Deuxième Pilote",
                compareButton: "Comparer",
                stats: [
                    { key: 'wins', label: 'Victoires' },
                    { key: 'podiums', label: 'Podiums' },
                    { key: 'totalRaces', label: 'Courses Totales' },
                ],
                noComparisonData: "Aucune donnée de comparaison disponible.",
            }
        },
        dashboard: {
                clearWidget: "Effacer les Widget",
            selectRider: "Sélectionner le Pilote",
            selectYear: "Sélectionner l'Année",
            selectCategory: "Sélectionner la Catégorie",
            selectEvent: "Sélectionner l'Événement",
            importLayout: "Importer la Mise en Page",
            exportLayout: "Exporter la Mise en Page",
        }
  },
};

export default translations;
