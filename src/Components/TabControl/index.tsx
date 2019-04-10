import { h, Component } from 'preact';
import './style.scss';
import { Checkbox } from '../Checkbox';
import { PreferencesRepository, CookieCategory, getSettings } from '../../Repositories';
import { Section } from '../Section';

interface TabControlState
{
    currentCategory: CookieCategory;
    consents: { [name: string]: boolean }
}

interface TabControlProps
{
    categories: CookieCategory[]
}

export class TabControl extends Component<TabControlProps, TabControlState>
{
    private settings = getSettings();
    constructor(props: TabControlProps)
    {
        super(props);
        const prefs = PreferencesRepository.load();
        for (let pref in prefs)
        {
            const category = props.categories.filter(t => t.code === pref)[0];
            if (category)
            {
                category.consent = prefs[pref];
            }
        }

        type ConsentMap = { [name: string]: boolean };
        const consents = props.categories.filter(t => t.consent != null).reduce<ConsentMap>((c, t) => { c[t.code] = t.consent; return c; }, {});
        this.state = { currentCategory: props.categories[0], consents };
    }

    private getCheckbox(category: CookieCategory)
    {
        if (category.consent == null)
        {
            return null;
        }

        const consent = this.state.consents[category.code];
        const {dialogCheckboxActive, dialogCheckboxInactive, dialogCheckbowAlways} = this.settings.labels;
        let label = consent ? dialogCheckboxActive : dialogCheckboxInactive;
        let onClick: (consent: boolean) => void;
        if (category.required)
        {
            label = `${dialogCheckbowAlways} ${label}`;
            onClick = () => this.forceUpdate();
        }
        else
        {
            onClick = consent => 
            {
                this.setState({ consents: { ...this.state.consents, [category.code]: consent } });
                category.consent = consent;
            }
        }

        return !category.required ?
            <Checkbox checked={consent} label={label} onClick={onClick} /> :
            <label className="cl-toggle"><span>{label}</span></label>
    }

    public render({categories}: TabControlProps, { currentCategory: currentCategory }: TabControlState)
    {
        const cookies = Object.entries(currentCategory.cookies || {});
        const externalUrl = /^(https?:|\/\/)/i;
        return <div class="cl-categories">
            <ul>
                {categories.map(t => <li key={t.code} className={t === currentCategory ? "active" : undefined} onClick={() => this.setState({ currentCategory: t })}>{t.tabTitle || t.title}</li>)}
            </ul>
            <div>
                <aside>
                    <h2>{currentCategory.title}</h2>
                    {this.getCheckbox(currentCategory)}
                </aside>
                <Section paragraphs={currentCategory.description} />
                {cookies.length > 0 && <fieldset>
                    <legend>Cookies used</legend>
                    <ul>
                        {cookies.map(([name, url]) => <li><a href={url} target={externalUrl.test(url) ? '_blank' : null}>{name}</a></li>)}
                    </ul>
                </fieldset>}
            </div>
        </div>
    }
}