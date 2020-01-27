import { CookieCategory } from "./Repositories";

export interface Labels
{
    bannerTitle: string;
    bannerMessage: string;
    bannerOk: string;
    bannerPreferences: string;
    dialogTitle: string;
    dialogSavePreferences: string;
    dialogCheckboxAlways: string;
    dialogCheckboxActive: string;
    dialogCheckboxInactive: string;
    dialogNext: string,
    dialogPrevious: string,
    cookieUsed: string;
}

type BuiltinLocale = "default" | "fr" | "nl";
const locales: { [locale in BuiltinLocale]: Partial<Labels> } =
{
    default:
    {
        bannerTitle: "We use cookies",
        bannerMessage: "We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content, to analyze our website traffic, and to understand where our visitors are coming from. For more information about the use of cookies on this web site, please consult our [cookie policy][cookiePolicy].",
        bannerOk: "OK",
        bannerPreferences: "Change my preferences",
        dialogNext: 'Next',
        dialogPrevious: 'Previous',
        dialogTitle: "Cookie Preferences",
        dialogSavePreferences: "Save my preferences",
        dialogCheckboxAlways: "Always",
        dialogCheckboxActive: "Active",
        dialogCheckboxInactive: "Inactive",
        cookieUsed: "Cookies"
    },
    fr:
    {
        bannerTitle: "Nous utilisons des cookies",
        bannerMessage: "Nous utilisons des cookies et d'autres technologies de suivi pour améliorer votre navigation sur notre site, pour afficher du contenu peronnalisé, pour analyser le trafique sur le site et déterminer d'où nos visiteur viennent. Si vous désirez plus d’informations sur les cookies liés à ce site web, consultez notre [politique de cookie][cookiePolicy].",
        bannerOk: "OK",
        bannerPreferences: "Changer mes préférences",
        dialogNext: 'Suivant',
        dialogPrevious: 'Précédent',
        dialogSavePreferences: "Sauver mes préférences",
        dialogCheckboxAlways: "Toujours",
        dialogCheckboxActive: "Actif",
        dialogCheckboxInactive: "Inactif"
    },
    nl:
    {
        bannerTitle: "We gebruiken cookies",
        bannerMessage: "We gebruiken cookies en andere trackingtechnologieën om uw surfervaring op onze website te verbeteren, om u gepersonaliseerde inhoud te tonen, om ons websiteverkeer te analyseren en om te begrijpen waar onze bezoekers vandaan komen. Voor meer informatie over de cookies op deze website kan u ons [cookiebeleid][cookiePolicy] raadplegen.",
        bannerOk: "OK",
        bannerPreferences: "Verander mijn voorkeuren",
        dialogNext: 'Volgende',
        dialogPrevious: 'Vorige',
        dialogSavePreferences: "Bewaar mijn voorkeuren",
        dialogCheckboxAlways: "Altijd",
        dialogCheckboxActive: "Actief",
        dialogCheckboxInactive: "Inactief"
    }
};
const defaultCategories: { [code: string]: {[locale in BuiltinLocale]:Partial<CookieCategory>} } =
{
    "introduction":
    {
        "default":
        {
            "tabTitle": "Your privacy",
            "title": "Your privacy is important to us",
            "description": [
                "Cookies are very small files stored on your computer when you visit a website. We use them for a variety of purposes such as enhancing your online experience on our website (for example, to remember your account login details and information on advertisements that have already been shown to you).",
                "You can adapt your preferences and decline certain types of cookies while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website."
            ]
        },
        "fr": 
        {
            "tabTitle": "Votre vie privée",
            "title": "Respecter votre vie privée nous tient à cœur",
            "description": [
                "Les cookies sont de très petits fichiers qui sont stockés dans votre ordinateur quand vous visitez un site web. Nous les utilisons à diverses fins, notamment pour améliorer votre expérience de navigation sur notre site web (afin par exemple de sauvegarder les détails login de votre compte et les informations sur les publicités qui vous ont déjà été montrées).",
                "Vous pouvez adapter vos préférences et refuser certains types de cookies en naviguant sur notre site web. Vous pouvez également supprimer tout cookie déjà stocké sur votre ordinateur, mais gardez à l’esprit que sa suppression pourra vous empêcher d’utiliser certaines parties du site."
            ]
        },
        "nl": 
        {
            "tabTitle": "Uw privacy",
            "title": "Uw privacy is belangrijk voor ons",
            "description": [
                "Een cookie is een klein tekstbestand dat een website op uw computer of mobiel toestel opslaat wanneer u die site bezoekt. Zo onthoudt de website de pagina’s die u heeft bezocht en uw voorkeuren (zoals gebruikersnaam, taal, lettergrootte en andere voorkeuren) zodat u die niet bij ieder bezoek aan de site opnieuw hoeft aan te passen.",
                "U kan uw voorkeuren instellen en bepaalde types van cookies weigeren tijdens het browsen. Het weigeren van bepaalde cookies kan wel inhouden dat u sommige onderdelen van de website niet meer kan gebruiken."
            ]
        }
    },
    "strictly-necessary":
    {
        "default":
        {
            "title": "Strictly necessary cookies",
            "consent": true,
            "required": true,
            "description": [
                "These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website. Without these cookies, we cannot provide you with certain services of our website."
            ]
        },
        "fr": 
        {
            "title": "Cookies strictement nécessaires",
            "description": [
                "Ces cookies sont indispensables pour pouvoir accéder aux services disponibles sur notre site web et vous permettre d’utiliser certaines de ses fonctionnalités. Sans ces cookies, nous ne pouvons pas vous fournir certains services du site."
            ]
        },
        "nl": 
        {
            "title": "Strikt noodzakelijke cookies",
            "description": [
                "Deze cookies zijn essentieel om toegang te krijgen tot de diensten van onze website en om bepaalde functionaliteiten te gebruiken. Deze cookies zullen dus bij elk websitebezoek geactiveerd worden."
            ]
        }
    },
    "functionality":
    {
        "default":
        {
            "title": "Functionality cookies",
            "consent": true,
            "description": [
                "These cookies are used to provide you with a more personalized experience on our website and to remember choices you make when you use our website. For example, we may use functionality cookies to remember your language preferences or your login details."
            ]
        },
        "fr":
        {
            "title": "Cookies liés aux fonctionnalités",
            "description": [
                "Ces cookies sont utilisés pour vous fournir une expérience plus personnalisée sur notre site et pour mémoriser les choix que vous faites quand vous utilisez celui-ci. Par exemple, nous pouvons utiliser les cookies liés aux fonctionnalités pour sauvegarder la langue sélectionnée ou les détails de votre login."
            ]
        },
        "nl": 
        {
            "title": "Functionele cookies",
            "description": [
                "We gebruiken deze cookies om u een meer gepersonaliseerde ervaring op onze website te bieden en om uw keuzes te onthouden. We kunnen bijvoorbeeld functionele cookies gebruiken om uw taalvoorkeuren en aanmeldgegevens te bewaren."
            ]
        }
    },
    "tracking":
    {
        "default":
        {
            "title": "Tracking and performance cookies",
            "consent": true,
            "description": [
                "These cookies are used to collect information to analyze the traffic to our website and how visitors are using our website. For example, these cookies may track things such as how long you spend on the website or the pages you visit which helps us to understand how we can improve our website site for you. The information collected through these tracking and performance cookies do not identify any individual visitor."
            ]
        },
        "fr":
        {
            "title": "Cookies de traçage et de performance",
            "description": [
                "Ces cookies sont utilisés pour recueillir des informations afin d’analyser le trafic vers notre site et comment les visiteurs l’utilisent. Par exemple, ces cookies peuvent retenir le temps passé sur le site ou sur les pages, ce qui nous aide à comprendre comment nous pouvons améliorer notre site pour vous. Les informations récoltées par ces cookies n’identifient pas les visiteurs individuellement. "
            ]
        },
        "nl":
        {
            "title": "Prestatiecookies",
            "description": [
                "Door deze cookies te gebruiken, verzamelen we informatie om ons websiteverkeer en het gebruik door de bezoekers te analyseren. De prestatiecookies kunnen onthouden hoe lang een bezoeker op de website of webpagina's actief is geweest. Hierdoor kunnen we onze website verbeteren voor u. De verzamelde informatie wordt niet gekoppeld aan een individuele bezoeker."
            ]
        }
    },
    "more_information":
    {
        "default":
        {
            "title": "More information",
            "description": [
                "You can find more information about the specific cookies we use in our [cookie policy][cookiePolicy]."
            ]
        },
        "fr": 
        {
            "title": "Informations complémentaires",
            "description": [
                "Vous pouvez trouver plus d'informations sur les cookies spécifiques que nous utilisons dans notre [politique de cookie][cookiePolicy]"
            ]
        },
        "nl":
        {
            "title": "Aanvullende informatie",
            "description": [
                "Meer informatie over de specifieke cookies die wij gebruiken, vindt u in ons [cookiebeleid][cookiePolicy]"
            ]
        }
    }
};
export function getLabels(locale: string)
{
    return { ...locales.default, ...locales[locale as BuiltinLocale] } as Labels;
}

export function getCategories(locale: string, categories: (CookieCategory | string)[])
{
    return categories.map(category =>
        {
            if (typeof category === "string")
            {
                const cat = defaultCategories[category];
                if (cat)
                {
                    return {code: category, ...cat.default, ...cat[locale as BuiltinLocale] } as CookieCategory;
                }
            }
            else
            {
                const cat = defaultCategories[category.code];
                return cat ? 
                    {...cat.default, ...cat[locale as BuiltinLocale], ...category} :
                    category;
            }
        });
}