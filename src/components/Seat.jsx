

export default function Seat({ children }) {
    return (
        <svg width="50" height="50" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 401H500V474C500 488.359 488.359 500 474 500H26C11.6406 500 0 488.359 0 474V401Z" fill="currentColor" />
            <path d="M98 67C98 29.9969 127.997 0 165 0H335C372.003 0 402 29.9969 402 67V382H98V67Z" fill="currentColor" />
            <path d="M0 171C0 156.641 11.6406 145 26 145H77V382H0V171Z" fill="currentColor" />
            <path d="M423 145H474C488.359 145 500 156.641 500 171V382H423V145Z" fill="currentColor" />
            <text fill="white" space="preserve" style={{
                "whiteSpace": "pre",
                "textAlign": "center",
                "width": "20px"
            }} fontFamily="Inter" fontSize="180" letterSpacing="0em"><tspan x="152.705" y="263.455">{children}</tspan></text>
        </svg>
    )
}