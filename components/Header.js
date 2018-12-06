import Link from 'next/link'

const linkStyle = {
  marginRight: 15,
}

const headerStyle = {
    marginBottom: 20,
}

const Header = () => (
    <div style={headerStyle}>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="#">
          <a style={linkStyle}>Refresh</a>
        </Link>
    </div>
)

export default Header