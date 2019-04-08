import { h, Component } from 'preact';
import './style.scss';
import { Checkbox } from '../Checkbox';
import { PreferencesRepository } from '../../Repositories';
import { labels } from '../../labels';

// const props = {
//     tabs: [
//         {
//             code: 'introduction',
//             tabTitle: 'Your privacy',
//             title: 'Your privacy is important to us',
//             description: [
//                 'Cookies are very small text files that are stored on your computer when you visit a website. We use cookies for a variety of purposes and to enhance your online experience on our website (for example, to remember your account login details).',
//                 'You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website.']
//         },
//         {
//             code: 'strictly-necessary',
//             title: 'Strictly necessary cookies',
// /*            consent: true,
//             required: true,*/
//             description: [
//                 'These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website.',
//                 'Without these cookies, we cannot provide you certain services on our website.',
//                 'Always Active'
//             ]
//         },
//         {
//             code: 'functionality',
//             title: 'Functionality cookies',
//             consent: true,
//             description: [
//                 'These cookies are used to provide you with a more personalized experience on our website and to remember choices you make when you use our website.',
//                 'For example, we may use functionality cookies to remember your language preferences or remember your login details.']
//         },
//         {
//             code: 'tracking',
//             title: 'Tracking and performance cookies',
//             consent: true,
//             description: [
//                 'These cookies are used to collect information to analyze the traffic traffic to our website and how visitors are using our website.',
//                 'For example, these cookies may track things such as how long you spend on the website or the pages you visit which helps us to understand how we can improve our website site for you.',
//                 'The information collected through these tracking and performance cookies do not identify any individual visitor.']
//         },
//         {
//             code: 'targeting',
//             title: 'Targeting and advertising cookies',
//             consent: true,
//             description: [
//                 'These cookies are used to show advertising that is likely to be of interest to you based on your browsing habits.',
//                 'These cookies, as served by our content and/or advertising providers, may combine information they collected from our website with other information they have independently collected relating to your web browser\'s activities across their network of websites.',
//                 'If you choose to remove or disable these targeting or advertising cookies, you will still see adverts but they may not be relevant to you.']
//         },
//         {
//             code: 'more_information',
//             title: 'More information',
//             description: ['For any queries in relation to our policy on cookies and your choices, please contact us.']
//         }
//     ]
// };
const props = {
    tabs: [
        {
            code: 'introduction',
            tabTitle: 'Uw privacy',
            title: 'Uw privacy is belangrijk voor ons',
            description: [
                'Cookies zijn heel kleine bestanden die op uw computer worden geplaatst wanneer u een website bezoekt.We gebruiken ze voor verschillende doeleinden, zoals de verbetering van uw gebruikservaring op onze website (bv. om uw aanmeldgegevens en informatie over eerder getoonde onlinereclames te onthouden).',
                'U kan uw voorkeuren instellen en bepaalde types van cookies wijgeren bij het bladeren door onze website. U kan ook geplaatste cookies verwijderen, maar hou dan in gedachte dat het verwijderen van cookies ervoor kan zorgen dat u sommige onderdelen niet meer kan gebruiken.']
        },
        {
            code: 'strictly-necessary',
            title: 'Strikt noodzakelijke cookies',
            consent: true,
            required: true,
            description: [
                'Deze cookies zijn essentieel om toegang te krijgen tot de diensten van onze website en om bepaalde functionaliteiten te gebruiken. Zonder deze cookies kunnen we bepaalde diensten van de website niet leveren.',
                'Without these cookies, we cannot provide you certain services on our website.'
            ]
        },
        {
            code: 'functionality',
            title: 'Functionele cookies',
            consent: true,
            description: [
                'We gebruiken deze cookies om u een meer gepersonaliseerde ervaring op onze website te bieden en om uw keuzes te onthouden. We kunnen bijvoorbeeld functionele cookies gebruiken om uw taalvoorkeuren en aanmeldgegevens te bewaren.']
        },
        {
            code: 'tracking',
            title: 'Prestatiecookies',
            consent: true,
            description: [
                'Door cookies te gebruiken verzamelen we informatie om onze website trafiek en het gebruik van de bezoekers te analyseren. Prestatiecookies kunnen bijvoorbeeld onthouden hoelang een bezoeker op de site of pagina’s is gebleven. Hierdoor kunnen we onze website verbeteren voor u. De informatie, verzameld door prestatiecookies, worden niet gekoppeld aan een individuele websitebezoeker.']
        },
        {
            code: 'more_information',
            title: 'Aanvullende informatie',
            description: ['Indien u vragen hebt in verband met ons cookie beleid of uw keuze, kunt u ons contacteren.']
        }
    ]
};

interface Tab
{
    code: string;
    title: string;
    tabTitle?: string;
    description: string[];
    consent?: boolean;
    required?: boolean;
}

interface TabControlState
{
    currentTab: Tab;
    consents: { [name: string]: boolean }
}

export class TabControl extends Component<{}, TabControlState>
{
    constructor()
    {
        super();

        //TODO: remove props from here.
        var prefs = PreferencesRepository.load();
        for (var pref in prefs)
        {
            let tab = props.tabs.filter(t => t.code === pref)[0];
            if (tab)
            {
                tab.consent = prefs[pref];
            }
        }

        type ConsentMap = { [name: string]: boolean };
        let consents = props.tabs.filter(t => t.consent != null).reduce<ConsentMap>((c, t) => { c[t.code] = t.consent; return c; }, {});
        this.state = { currentTab: props.tabs[0], consents };
    }

    private getCheckbox(tab: Tab)
    {
        if (tab.consent == null)
        {
            return null;
        }

        let consent = this.state.consents[tab.code];
        let label = consent ? labels.CHECKBOX_ACTIVE : labels.CHECKBOX_INACTIVE;
        let onClick: (consent: boolean) => void;
        if (tab.required)
        {
            label = `${labels.CHECKBOX_ALWAYS} ${label}`;
            onClick = () => this.forceUpdate();
        }
        else
        {
            onClick = consent => 
            {
                this.setState({ consents: { ...this.state.consents, [tab.code]: consent } });
                tab.consent = consent;
            }
        }

        return !tab.required ?
            <Checkbox checked={consent} label={label} onClick={onClick} /> :
            <label className=".cl-toggle">{label}</label>
    }

    public render(_: any, { currentTab }: TabControlState)
    {
        return <div class="cl-tabs">
            <ul>
                {props.tabs.map(t => <li key={t.code} className={t === currentTab ? "active" : undefined} onClick={() => this.setState({ currentTab: t })}>{t.tabTitle || t.title}</li>)}
            </ul>
            <div>
                <aside>
                    <h2>{currentTab.title}</h2>
                    {this.getCheckbox(currentTab)}
                </aside>
                {currentTab.description.map(p => <p>{p}</p>)}
            </div>
        </div>
    }
}