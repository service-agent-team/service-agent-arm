import { GoogleMap, GoogleMapProps, useJsApiLoader } from '@react-google-maps/api';

export const Maps = (props: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANA8h-fA595Nq-OMLG7JmTBWT-1R5eNVQ',
  });

  return (
    <>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} zoom={6} {...props}>
          {props.children}
        </GoogleMap>
      ) : (
        ''
      )}
    </>
  );
};
