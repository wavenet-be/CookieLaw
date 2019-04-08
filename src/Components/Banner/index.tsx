import { h, Component, render } from 'preact';
import './style.scss';
import { labels } from '../../labels';
import { getHost, setHost, applyCookieScripts } from '../../helper';
import { PreferencesDialog } from '../PreferencesDialog';
import { PreferencesRepository } from '../../Repositories';

export class Banner extends Component
{
    private static readonly HOST = "banner";

    constructor()
    {
        super();
        this.save = this.save.bind(this);
    }

    private save()
    {
        PreferencesRepository.save({"strictly-necessary":true,"functionality":true,"tracking":true,"targeting":true});
        Banner.hide();
        applyCookieScripts();
    }

    public static show()
    {
        const host = getHost(Banner.HOST);
        setHost(Banner.HOST, render(<Banner />, host.parentElement, host));
    }

    public static hide()
    {
        const host = getHost(Banner.HOST);
        setHost(Banner.HOST, render(null, host.parentElement, host));
    }

    render()
    {
        return <div className="cl-banner">
            {labels.banner.title && <b>{labels.banner.title}</b>}
            <p>{labels.banner.message}</p>
            <section>
                <button onClick={this.save}>{labels.banner.ok}</button>
                <button className="cl-pref" onClick={PreferencesDialog.show}>{labels.banner.preferences}</button>
            </section>
        </div>;
    }
}