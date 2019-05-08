import {h, Component } from 'preact';
import './style.scss';

interface CheckboxProps
{
    checked: boolean;
    label?: string;
    onClick?: (checked: boolean)=>void;
}

export class Checkbox extends Component<CheckboxProps>
{
    constructor(props: CheckboxProps)
    {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    private onClick(e: Event)
    {
        e.preventDefault();
        const {onClick, checked} = this.props;
        if (onClick)
        {
            onClick(!checked);
        }
    }

    render({checked, label}: CheckboxProps)
    {
        return <label className="cl-toggle">
            <input type="checkbox" checked={checked} onChange={this.onClick} />
            <span>{label}</span>
        </label>;
    }
}