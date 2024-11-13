


export default function Button({text, href}) {
    return(<a className="text-sm text-white bg-blue-500 hover:bg-blue-900 mx-auto p-1 block rounded-sm" href={href}>
        {text}
    </a>);
}