import Head from "./components/head"

const style404 = {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: '#b5a9cc',
    fontFamily: `'Quicksand', 'sans-serif`,
    fontSize: '2rem',
}

export const NotFound = () => {
    return (
        <>
        <Head title="Page not found"/>
        <div style={style404}>
                 Page you are looking for does not seem to exist.
        </div>
        </>
    )
}