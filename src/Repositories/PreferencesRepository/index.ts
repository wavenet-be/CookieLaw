import { getSettings } from "../SettingsRepository";

interface CookiePreferences
{
    [type: string]: boolean;
}

export interface IUserConsent
{
    stored: boolean;
}

export class PreferencesRepository
{
    private static readonly COOKIE_NAME = 'CookieLaw';

    public static save(preferences: CookiePreferences)
    {
        let settings = getSettings();
        switch(settings.storage || 'local')
        {
            case 'local':
                localStorage.setItem(PreferencesRepository.COOKIE_NAME, JSON.stringify(preferences));
                break;

            case 'cookie':
                document.cookie = `${this.COOKIE_NAME}=${JSON.stringify(preferences)};path=/;max-age=31536000`;
                break;

            default:
                throw Error(`Unknown storage: ${settings.storage}`);
        }
    }

    public static load(userConsent?: IUserConsent): CookiePreferences
    {
        let settings = getSettings();
        let preferences: string;
        switch(settings.storage || 'local')
        {
            case 'local':
                preferences = localStorage.getItem(PreferencesRepository.COOKIE_NAME);
                break;
                
            case 'cookie':
                let parser = new RegExp(`^\\s*${this.COOKIE_NAME}=(\\{.+\\})\\s*$`);
                document.cookie.split(';').find(cookie => 
                    {
                        let value = parser.exec(cookie);
                        preferences = value && value[1];
                        return !!preferences;
                    });
                break;

            default:
                throw Error(`Unknown storage: ${settings.storage}`);
        }

        let result = JSON.parse(preferences);
        if (userConsent)
        {
            userConsent.stored = !!result;
        }

        if (!result && settings.isOptOut)
        {
            result = settings.categories.reduce(function(r: any, v)
            {
                if (v.consent)
                {
                    r[v.code] = true;
                }
                
                return r;
            }, {});
        }

        return result || {};
    }
}