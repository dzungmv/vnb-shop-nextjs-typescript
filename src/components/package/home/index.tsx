import FeaturesComp from './features';
import HeroComp from './hero';
import CatalogComp from './catalog';
import BenefitComp from './benefit';

const HomePage = () => {
    return (
        <section className='max-w-[1260px] mx-auto'>
            <HeroComp />
            <FeaturesComp />
            <CatalogComp />
            <BenefitComp />
        </section>
    );
};

HomePage.displayName = 'HomePage';

export default HomePage;
