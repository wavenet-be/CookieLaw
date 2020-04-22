import { h, Component, render } from 'preact';
import './style.scss';
import { TabControl } from '../TabControl';
import { getHost, setHost, applyPreferences } from '../../helper';
import { Banner } from '../Banner';
import { PreferencesRepository, CookieLawSettings, getSettings } from '../../Repositories';

interface PreferencesDialogProps
{
    settings: CookieLawSettings;
}

export class PreferencesDialog extends Component<PreferencesDialogProps>
{
    private static readonly HOST = "CookieLawPreferences";

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
        applyPreferences();
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
        setHost(PreferencesDialog.HOST, render(<PreferencesDialog settings={getSettings()} />, host.parentElement, host));
    }

    public static hide()
    {
        const host = getHost(PreferencesDialog.HOST);
        setHost(PreferencesDialog.HOST, render(null, host.parentElement, host));
    }

    public render({ settings }: PreferencesDialogProps) 
    {
        return <div className="cl-preferences-overlay notranslate" onClick={e => e.target === e.currentTarget && PreferencesDialog.hide()}>
            <div className="cl-dialog">
                <header>
                    {settings.labels.dialogTitle}
                </header>
                <TabControl ref={t => this.tabs = t} categories={settings.categories} links={settings.links} />
                <footer>
                    {
                        !settings.licence && 
                        <span>
                            Cookie Preferences by <a href="https://www.wavenet.be/" target="_blank" rel="noopener noreferrer">Wavenet ©</a>
                        </span>
                    }
                    {
                        settings.licence && <span />
                    }
                    <button onClick={this.save}>{settings.labels.dialogSavePreferences}</button>
                </footer>
            </div>
        </div>;
    }
}