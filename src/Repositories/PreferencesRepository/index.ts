interface CookiePreferences
{
    [type: string]: boolean;
}

export class PreferencesRepository
{
    private static readonly COOKIE_NAME = 'CookieLaw';

    public static save(preferences: CookiePreferences)
    {
        localStorage.setItem(this.COOKIE_NAME, JSON.stringify(preferences));
    }

    public static load(): CookiePreferences
    {
        return JSON.parse(localStorage.getItem(this.COOKIE_NAME)) || {};
    }
}