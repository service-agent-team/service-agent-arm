import { useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Spin, Button, Modal, AutoComplete, Input, Space } from 'antd';

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALfqQ3ezC7K1GxmJ1e5EMqdQzrXdrDcdA',
    libraries: ['places'],
  });

  if (!isLoaded)
    return (
      <Spin
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          left: '0',
          bottom: '0',
        }}
        size="large"
      />
    );
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        key={1}
        width={400}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PlacesAutocomplete setSelected={setSelected} />
        <div style={{ marginTop: '20px' }}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '300px' }}
            zoom={5}
            center={center || selected}
            mapContainerClassName="map-container"
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </div>
      </Modal>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }: { setSelected: any }) => {
  const {
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <AutoComplete
      onChange={(value: string) => setValue(value)}
      onSelect={handleSelect}
      style={{ width: '100%' }}
    >
      {status === 'OK' &&
        data.map(({ place_id, description }, idx) => (
          <AutoComplete.Option key={place_id} value={description}>
            {`${idx + 1}. ${description}`}
          </AutoComplete.Option>
        ))}
      <Input.Search size="large" placeholder="Search address" enterButton />
    </AutoComplete>
  );
};
