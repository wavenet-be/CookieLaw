import { h, Component, render } from 'preact';
import './style.scss';
import { getHost, setHost, applyPreferences } from '../../helper';
import { PreferencesDialog } from '../PreferencesDialog';
import { PreferencesRepository, getSettings, CookieLawSettings } from '../../Repositories';
import { Section } from '../Section';

interface BannerProps
{
    settings: CookieLawSettings;
}

export class Banner extends Component<BannerProps>
{
    private static readonly HOST = "CookieLawBanner";

    constructor()
    {
        super();
        this.save = this.save.bind(this);
    }

    private save()
    {
        type ConsentMap = { [name: string]: boolean };
        const consents = this.props.settings.categories.filter(t => t.consent != null).reduce<ConsentMap>((c, t) => { c[t.code] = t.consent; return c; }, {});
        PreferencesRepository.save(consents);
        Banner.hide();
        applyPreferences();
    }

    public static show()
    {
        const host = getHost(Banner.HOST);
        setHost(Banner.HOST, render(<Banner settings={getSettings()} />, host.parentElement, host));
    }

    public static hide()
    {
        const host = getHost(Banner.HOST);
        setHost(Banner.HOST, render(null, host.parentElement, host));
    }

    render({ settings }: BannerProps)
    {
        const { bannerTitle, bannerMessage, bannerOk, bannerPreferences } = settings.labels;
        return <div className="cl-banner">
            {bannerTitle && <b>{bannerTitle}</b>}
            <Section paragraphs={[bannerMessage]} links={settings.links} />
            <section className="cl-buttons">
                <button onClick={this.save}>{bannerOk}</button>
                <button className="cl-pref" onClick={PreferencesDialog.show}>{bannerPreferences}</button>
            </section>
        </div>;
    }
}