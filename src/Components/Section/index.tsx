import { h } from 'preact';

interface SectionProps
{
    paragraphs: string[];
}

function getParagraph(text: string)
{
    const IS_HTML = "!HTML!"
    return text.substr(0, IS_HTML.length) === IS_HTML ?
        <p dangerouslySetInnerHTML={{__html:text.substr(IS_HTML.length)}} /> :
        <p>{text}</p>
}

export function Section({paragraphs}: SectionProps)
{
    return <section>
        {paragraphs.map(getParagraph)}
    </section>;
}