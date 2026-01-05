function Header()
{

    return (<header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarText">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto text-left">
                  <li className="nav-item active">
                      <a className="nav-link" href="/">Home</a>
                  </li>
              </ul>
          </div>
          <a className="navbar-brand" href="/">Play2Learn</a>
        </div>
      </nav>
    </header>)
}
export default Header