const HeroHome = () => {

    const lookingDown = () => {
        window.scroll({
            top: 500,
            behavior: 'smooth'
        });

    }

    return (
        <div className="contenedor">
            <video id="video_hero" loop autoPlay muted>
                <source src="https://baravdg.com/wp-content/uploads/2021/05/pexels-ron-lach-6756046-1.mp4" type="video/mp4" />
            </video>
            <div className="contenido">
                <h1 className="titleHero">Explore</h1>
                <h4 className="subTitleHero"> Dare to explore new horizons
                </h4>
                <button onClick={lookingDown} className="callToActionHome">
                    Start now
                </button>
            </div>
        </div>
    )
}

export default HeroHome