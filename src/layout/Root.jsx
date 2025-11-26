import Header from '../component/Header';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';
import ScrollToTop from '../component/ScrolltoTop';
import ScrollTopButton from '../component/ScrollTopButton';
import PageMeta from '../component/PageMeta';

const Root = () => {
    return (
        <div>
            <PageMeta></PageMeta>
            <ScrollTopButton></ScrollTopButton>
            <ScrollToTop></ScrollToTop>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;