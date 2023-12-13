import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { ROUTES } from '@/constants';

export const Breadcrumb = () => {
  const { pathname } = useLocation();

  const homeItem = {
    title:
      pathname === ROUTES.home ? (
        <HomeOutlined />
      ) : (
        <Link to={ROUTES.home}>
          <HomeOutlined />
        </Link>
      ),
  };

  const pathSegments = useMemo(
    () => pathname.split('/').filter((segment) => segment !== ''),
    [pathname],
  );

  const generateBreadcrumbItems = () => {
    const segmentItems = pathSegments.map((segment, idx) => {
      const title = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();

      return {
        title:
          pathSegments.at(-1) === segment ? (
            title
          ) : (
            <Link key={segment} to={`/${pathSegments.slice(0, idx + 1).join('/')}`}>
              {title}
            </Link>
          ),
      };
    });

    return [homeItem, ...segmentItems];
  };

  const breadcrumbItems = useMemo(generateBreadcrumbItems, [pathSegments]);

  return <AntBreadcrumb items={breadcrumbItems} />;
};
