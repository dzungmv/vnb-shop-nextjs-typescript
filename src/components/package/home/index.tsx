import FeaturesComp from './features';
import HeroComp from './hero';
import CatalogComp from './catalog';

const HomePage = () => {
    return (
        <section className='max-w-[1260px] mx-auto'>
            <HeroComp />
            <FeaturesComp />
            <CatalogComp />
        </section>
    );
};

HomePage.displayName = 'HomePage';

export default HomePage;
