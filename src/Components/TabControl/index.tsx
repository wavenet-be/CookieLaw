import { h, Component } from 'preact';
import './style.scss';
import { Checkbox } from '../Checkbox';
import { PreferencesRepository, CookieCategory, getSettings, Links } from '../../Repositories';
import { Section } from '../Section';

interface TabControlState
{
    currentCategory: CookieCategory;
    consents: { [name: string]: boolean }
}

interface TabControlProps
{
    categories: CookieCategory[]
    links: Links;
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

    public render({categories, links}: TabControlProps, { currentCategory: currentCategory }: TabControlState)
    {
        const cookies = Object.entries(currentCategory.cookies || {});
        const externalUrl = /^(https?:|\/\/)/i;
        const categoryIndex = this.props.categories.indexOf(currentCategory);
        const previousCategory = this.props.categories[categoryIndex - 1];
        const nextCategory = this.props.categories[categoryIndex + 1];
        return <div class="cl-categories">
            <ul>
                {categories.map(t => <li key={t.code} className={t === currentCategory ? "active" : undefined} onClick={() => this.setState({ currentCategory: t })}>{t.tabTitle || t.title}</li>)}
            </ul>
            <div>
                <aside>
                    <h2>{currentCategory.title}</h2>
                    {this.getCheckbox(currentCategory)}
                </aside>
                <Section paragraphs={currentCategory.description} links={links} />
                {cookies.length > 0 && <fieldset>
                    <legend>{this.settings.labels.cookieUsed}</legend>
                    <ul>
                        {cookies.map(([name, url]) => <li><a href={url} target={externalUrl.test(url) ? '_blank' : null} rel={externalUrl.test(url) ? "noopener noreferrer" : null}>{name}</a></li>)}
                    </ul>
                </fieldset>}
                <section class="cl-mobile-navigation">
                    {previousCategory && <button onClick={() => this.setState({currentCategory: previousCategory})}>{this.settings.labels.dialogPrevious}</button>}
                    <span />
                    {nextCategory && <button onClick={() => this.setState({currentCategory: nextCategory})}>{this.settings.labels.dialogNext}</button>}
                </section>
            </div>
        </div>
    }
}