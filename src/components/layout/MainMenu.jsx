import { Link } from "react-router-dom";

function MainMenu() {
    return (
        <nav>
            <Link className="nav-link d-flex align-items-center my-1" to='/'>
                <span className="menu-icon">
                    <span className=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M18.0624 15.3454L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3454C4.56242 13.6454 3.76242 11.4452 4.06242 8.94525C4.56242 5.34525 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24525 19.9624 9.94525C20.0624 12.0452 19.2624 13.9454 18.0624 15.3454ZM13.0624 10.0453C13.0624 9.44534 12.6624 9.04534 12.0624 9.04534C11.4624 9.04534 11.0624 9.44534 11.0624 10.0453V13.0453H13.0624V10.0453Z" fill="currentColor"/>
                    <path d="M12.6624 5.54531C12.2624 5.24531 11.7624 5.24531 11.4624 5.54531L8.06241 8.04531V12.0453C8.06241 12.6453 8.46241 13.0453 9.06241 13.0453H11.0624V10.0453C11.0624 9.44531 11.4624 9.04531 12.0624 9.04531C12.6624 9.04531 13.0624 9.44531 13.0624 10.0453V13.0453H15.0624C15.6624 13.0453 16.0624 12.6453 16.0624 12.0453V8.04531L12.6624 5.54531Z" fill="currentColor"/>
                    </svg>
                    </span>
                </span>
                <span className="menu-title">Accueil</span>
            </Link>
            <Link className="nav-link d-flex align-items-center my-1" to='/sensors'>
                <span className="menu-icon">
                    <span className=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4409 22C13.5455 22 14.4409 21.1046 14.4409 20C14.4409 18.8954 13.5455 18 12.4409 18C11.3364 18 10.4409 18.8954 10.4409 20C10.4409 21.1046 11.3364 22 12.4409 22Z" fill="currentColor"/>
                        <path opacity="0.3" d="M9.04095 14.8L9.94095 16.1C10.6409 15.6 11.5409 15.3 12.4409 15.3C13.3409 15.3 14.2409 15.6 14.9409 16.1L15.8409 14.8C16.1409 14.3 16.0409 13.6 15.4409 13.4C14.5409 13 13.5409 12.7 12.4409 12.7C11.3409 12.7 10.3409 12.9 9.44095 13.4C8.84095 13.6 8.74095 14.3 9.04095 14.8Z" fill="currentColor"/>
                        <path opacity="0.3" d="M3.14096 5.80005L4.04095 7.19995C6.44095 5.59995 9.34094 4.69995 12.4409 4.69995C15.5409 4.69995 18.4409 5.59995 20.8409 7.19995L21.7409 5.80005C22.0409 5.30005 21.8409 4.70002 21.3409 4.40002C18.7409 2.90002 15.6409 2 12.4409 2C9.24094 2 6.14095 2.90002 3.54095 4.40002C3.04095 4.70002 2.84096 5.30005 3.14096 5.80005Z" fill="currentColor"/>
                        <path opacity="0.3" d="M6.14097 10.3L7.04096 11.7C8.64096 10.7 10.441 10.1 12.541 10.1C14.641 10.1 16.441 10.7 18.041 11.7L18.941 10.3C19.241 9.80005 19.141 9.10002 18.541 8.90002C16.741 7.90002 14.741 7.40002 12.541 7.40002C10.341 7.40002 8.34096 7.90002 6.54096 8.90002C5.94096 9.10002 5.74097 9.80005 6.14097 10.3Z" fill="currentColor"/>
                        </svg>
                    </span>
                </span>
                <span className="menu-title">Mes capteurs</span>
            </Link>
            <Link className="nav-link d-flex align-items-center my-1" to='/parks'>
                <span className="menu-icon">
                    <span className=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7H3C2.4 7 2 6.6 2 6V3C2 2.4 2.4 2 3 2H6C6.6 2 7 2.4 7 3V6C7 6.6 6.6 7 6 7Z" fill="currentColor"/>
                        <path opacity="0.3" d="M13 7H10C9.4 7 9 6.6 9 6V3C9 2.4 9.4 2 10 2H13C13.6 2 14 2.4 14 3V6C14 6.6 13.6 7 13 7ZM21 6V3C21 2.4 20.6 2 20 2H17C16.4 2 16 2.4 16 3V6C16 6.6 16.4 7 17 7H20C20.6 7 21 6.6 21 6ZM7 13V10C7 9.4 6.6 9 6 9H3C2.4 9 2 9.4 2 10V13C2 13.6 2.4 14 3 14H6C6.6 14 7 13.6 7 13ZM14 13V10C14 9.4 13.6 9 13 9H10C9.4 9 9 9.4 9 10V13C9 13.6 9.4 14 10 14H13C13.6 14 14 13.6 14 13ZM21 13V10C21 9.4 20.6 9 20 9H17C16.4 9 16 9.4 16 10V13C16 13.6 16.4 14 17 14H20C20.6 14 21 13.6 21 13ZM7 20V17C7 16.4 6.6 16 6 16H3C2.4 16 2 16.4 2 17V20C2 20.6 2.4 21 3 21H6C6.6 21 7 20.6 7 20ZM14 20V17C14 16.4 13.6 16 13 16H10C9.4 16 9 16.4 9 17V20C9 20.6 9.4 21 10 21H13C13.6 21 14 20.6 14 20ZM21 20V17C21 16.4 20.6 16 20 16H17C16.4 16 16 16.4 16 17V20C16 20.6 16.4 21 17 21H20C20.6 21 21 20.6 21 20Z" fill="currentColor"/>
                        </svg>
                    </span>
                </span>
                <span className="menu-title">Mes parcs</span>
            </Link>
            <Link className="nav-link d-flex align-items-center my-1" to='/companies'>
                <span className="menu-icon">
                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"/>
                        <path d="M12.0006 11.1542C13.1434 11.1542 14.0777 10.22 14.0777 9.0771C14.0777 7.93424 13.1434 7 12.0006 7C10.8577 7 9.92348 7.93424 9.92348 9.0771C9.92348 10.22 10.8577 11.1542 12.0006 11.1542Z" fill="currentColor"/>
                        <path d="M15.5652 13.814C15.5108 13.6779 15.4382 13.551 15.3566 13.4331C14.9393 12.8163 14.2954 12.4081 13.5697 12.3083C13.479 12.2993 13.3793 12.3174 13.3067 12.3718C12.9257 12.653 12.4722 12.7981 12.0006 12.7981C11.5289 12.7981 11.0754 12.653 10.6944 12.3718C10.6219 12.3174 10.5221 12.2902 10.4314 12.3083C9.70578 12.4081 9.05272 12.8163 8.64456 13.4331C8.56293 13.551 8.49036 13.687 8.43595 13.814C8.40875 13.8684 8.41781 13.9319 8.44502 13.9864C8.51759 14.1133 8.60828 14.2403 8.68991 14.3492C8.81689 14.5215 8.95295 14.6757 9.10715 14.8208C9.23413 14.9478 9.37925 15.0657 9.52439 15.1836C10.2409 15.7188 11.1026 15.9999 11.9915 15.9999C12.8804 15.9999 13.7421 15.7188 14.4586 15.1836C14.6038 15.0748 14.7489 14.9478 14.8759 14.8208C15.021 14.6757 15.1661 14.5215 15.2931 14.3492C15.3838 14.2312 15.4655 14.1133 15.538 13.9864C15.5833 13.9319 15.5924 13.8684 15.5652 13.814Z" fill="currentColor"/>
                    </svg>
                </span>
                </span>
                <span className="menu-title">Mes espaces</span>
            </Link>
        </nav>
    );
}

export default MainMenu