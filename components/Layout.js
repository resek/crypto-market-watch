import Header from './Header'

const layoutStyle = {
	margin: 20,
}

const Layout = (props) => (
  	<div style={layoutStyle}>
      	<Header />
      	{props.children}
    </div>
)

export default Layout