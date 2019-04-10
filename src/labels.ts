export interface Labels
{
    bannerTitle: string;
    bannerMessage: string;
    bannerOk: string;
    bannerPreferences: string;
    dialogSavePreferences: string;
    dialogCheckbowAlways: string;
    dialogCheckboxActive: string;
    dialogCheckboxInactive: string;
}

const locales: { [locale: string]: Partial<Labels> } =
{
    default: 
    {
        bannerTitle: "We use cookies",
        bannerMessage: "We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content, to analyze our website traffic, and to understand where our visitors are coming from. For more information about the use of cookies on this web site, please consult our cookie policy.",
        bannerOk: "OK",
        bannerPreferences: "Change my preferences",
        dialogSavePreferences: "Save my preferences",
        dialogCheckbowAlways: "Always",
        dialogCheckboxActive: "Active",
        dialogCheckboxInactive: "Inactive"
    },
    fr:
    {
        bannerTitle: "Nous utilisons des cookies",
        bannerMessage: "Nous utilisons des cookies et d'autres technologies de suivi pour améliorer votre navigation sur notre site, pour afficher du contenu peronnalisé, pour analyser le trafique sur le site et déterminer d'où nos visiteur viennent. Si vous désirez plus d’informations sur les cookies liés à ce site web, consultez notre cookie policy.",
        bannerOk: "OK",
        bannerPreferences: "Changer mes préférences",
        dialogSavePreferences: "Sauver mes préférences",
        dialogCheckbowAlways: "Toujours",
        dialogCheckboxActive: "Actif",
        dialogCheckboxInactive: "Inactif"
    },
    nl: 
    {
        bannerTitle: "We gebruiken cookies",
        bannerMessage: "We gebruiken cookies en andere trackingtechnologieën om uw surfervaring op onze website te verbeteren, om u gepersonaliseerde inhoud te tonen, om ons websiteverkeer te analyseren en om te begrijpen waar onze bezoekers vandaan komen. Voor meer informatie over de cookies op deze website kan u ons cookiebeleid raadplegen.",
        bannerOk: "OK",
        bannerPreferences: "Verander mijn voorkeuren",
        dialogSavePreferences: "Bewaar mijn voorkeuren",
        dialogCheckbowAlways: "Altijd",
        dialogCheckboxActive: "Actief",
        dialogCheckboxInactive: "Inactief"
    }
};

export function getLabels(locale: string)
{
    return {...locales.default, ...locales[locale]} as Labels;
}