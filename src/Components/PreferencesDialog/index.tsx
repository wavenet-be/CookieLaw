import { h, Component, render } from 'preact';
import './style.scss';
import { TabControl } from '../TabControl';
import { getHost, setHost, applyCookieScripts } from '../../helper';
import { Banner } from '../Banner';
import { PreferencesRepository } from '../../Repositories';
import { labels } from '../../labels';

export class PreferencesDialog extends Component 
{
    private static readonly HOST = "preferences";

    private tabs: TabControl;

    private static keyboardListener(this: Document, e: KeyboardEvent)
    {
        if (e.key === 'Escape')
        {
            PreferencesDialog.hide();
        }
    }

    constructor()
    {
        super();
        this.save = this.save.bind(this);
    }

    private save()
    {
        const consents = this.tabs.state.consents;
        PreferencesRepository.save(consents);
        PreferencesDialog.hide();
        Banner.hide();
        applyCookieScripts();
    }

    public componentDidMount()
    {
        document.addEventListener('keydown', PreferencesDialog.keyboardListener);
    }

    public componentWillUnmount()
    {
        document.removeEventListener('keydown', PreferencesDialog.keyboardListener);
    }

    public static show()
    {
        const host = getHost(PreferencesDialog.HOST);
        setHost(PreferencesDialog.HOST, render(<PreferencesDialog />, host.parentElement, host));
    }

    public static hide()
    {
        const host = getHost(PreferencesDialog.HOST);
        setHost(PreferencesDialog.HOST, render(null, host.parentElement, host));
    }

    public render() 
    {
        return <div className="cl-preferences-overlay" onClick={e => e.target === e.currentTarget && PreferencesDialog.hide()}>
            <div className="cl-dialog">
                <header>
                    Cookies Preferences
                </header>
                <TabControl ref={t => this.tabs = t} />
                <footer>
                    <span style="visibility:hidden">
                        Cookies Preferences by <a href="https://www.wavenet.be/" target="_blank" rel="noopener noreferrer">Wavenet ©</a>
                    </span>
                    <button onClick={this.save}>{labels.DIALOG_SAVE_PREFERENCES}</button>
                </footer>
            </div>
        </div>;
    }
}