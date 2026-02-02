import React, { useMemo, useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, Autocomplete, useLoadScript } from "@react-google-maps/api";

const LIBRARIES = ["places"];
const to7 = (n) => (Number.isFinite(n) ? Number(n).toFixed(7) : "");
const DEFAULT_CENTER = { lat: 14.6349, lng: -90.5069 };

export default function CreateAgenciaForm({
  formData,
  handleChangeForm,
  setField,                 
  handleFileChange,
  municipios = [],
  loadingMunicipios = false,
}) {
  const municipioOptions = useMemo(() => municipios || [], [municipios]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [markerPos, setMarkerPos] = useState(() => {
    const lat = parseFloat(formData?.latitud);
    const lng = parseFloat(formData?.longitud);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
    return DEFAULT_CENTER;
  });

  const acRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (isLoaded && window.google && !geocoderRef.current) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  // si cambian manualmente lat/lng, mueve marker
  useEffect(() => {
    const lat = parseFloat(formData?.latitud);
    const lng = parseFloat(formData?.longitud);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) setMarkerPos({ lat, lng });
  }, [formData?.latitud, formData?.longitud]);

  const updateLatLng = (lat, lng) => {
    setField("latitud", to7(lat));
    setField("longitud", to7(lng));
    setMarkerPos({ lat, lng });
  };

  const reverseGeocode = async (lat, lng) => {
    const geocoder = geocoderRef.current;
    if (!geocoder) return;

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setField("address", results[0].formatted_address || "");
      }
    });
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    updateLatLng(lat, lng);
    await reverseGeocode(lat, lng);
  };

  const handleMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    updateLatLng(lat, lng);
    await reverseGeocode(lat, lng);
  };

  const onLoadAutocomplete = (ac) => (acRef.current = ac);

  const onPlaceChanged = () => {
    const ac = acRef.current;
    if (!ac) return;

    const place = ac.getPlace();
    const loc = place?.geometry?.location;
    if (!loc) return;

    const lat = loc.lat();
    const lng = loc.lng();
    updateLatLng(lat, lng);

    if (place.formatted_address) setField("address", place.formatted_address);
  };

  if (loadError) {
    return (
      <div className="alert alert-error">
        Error cargando Google Maps. Revisa API Key y habilita “Maps JavaScript API” y “Places API”.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="form-control">
          <label className="label">
            <i class="fa-solid fa-building-columns"></i>
            <span className="label-text">
              Nombre
            </span></label>
          <input
            name="name"
            className="input input-bordered rounded-xl"
            value={formData.name}
            onChange={handleChangeForm}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <i className="fa-regular fa-barcode-scan"></i>
            <span className="label-text">
              Serie agencia
            </span></label>
          <input
            name="serie_agencia"
            className="input input-bordered rounded-xl"
            value={formData.serie_agencia}
            onChange={handleChangeForm}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <i className="fa-solid fa-input-numeric"></i>
            <span className="label-text">
              Código agencia
            </span></label>
          <input
            name="codigo_agencia"
            className="input input-bordered rounded-xl"
            value={formData.codigo_agencia}
            onChange={handleChangeForm}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <i className="fa-solid fa-phone"></i>
            <span className="label-text">
              Teléfono
            </span></label>
          <input
            name="phone"
            className="input input-bordered rounded-xl"
            value={formData.phone}
            onChange={handleChangeForm}
            placeholder="0000-0000"
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <i class="fa-solid fa-location-dot"></i>
            <span className="label-text">
              Dirección
            </span>
          </label>

          {isLoaded ? (
            <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
              <input
                name="address"
                className="input input-bordered rounded-xl w-full"
                value={formData.address}
                onChange={handleChangeForm}
                placeholder="Escribe una dirección y selecciona…"
                required
              />
            </Autocomplete>
          ) : (
            <input
              name="address"
              className="input input-bordered rounded-xl w-full"
              value={formData.address}
              onChange={handleChangeForm}
              required
            />
          )}

          <div className="mt-2 text-xs opacity-70">
            Tip: click en mapa o arrastra el pin para fijar coordenadas.
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <i class="fa-duotone fa-solid fa-map"></i>
            <span className="label-text">
              Municipio
            </span></label>
          <select
            name="cod_municipio"
            className="select select-bordered rounded-xl"
            value={formData.cod_municipio}
            onChange={handleChangeForm}
            required
            disabled={loadingMunicipios}
          >
            <option value="">
              {loadingMunicipios ? "Cargando..." : "Seleccione un municipio"}
            </option>
            {municipioOptions.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Longitud</span></label>
          <input
            name="longitud"
            className="input input-bordered rounded-xl"
            value={formData.longitud}
            onChange={handleChangeForm}
            onBlur={() => {
              const n = parseFloat(formData.longitud);
              if (!Number.isNaN(n)) setField("longitud", to7(n));
            }}
            required
          />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Latitud</span></label>
          <input
            name="latitud"
            className="input input-bordered rounded-xl"
            value={formData.latitud}
            onChange={handleChangeForm}
            onBlur={() => {
              const n = parseFloat(formData.latitud);
              if (!Number.isNaN(n)) setField("latitud", to7(n));
            }}
            required
          />
        </div>

        <div className="md:col-span-2">
          <div className="card bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
            <div className="card-body p-3">
              <div className="font-semibold">Ubicación en el mapa</div>

              <div className="mt-2 rounded-xl overflow-hidden border border-base-200">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "320px" }}
                    center={markerPos}
                    zoom={15}
                    onClick={handleMapClick}
                    options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: true }}
                  >
                    <Marker position={markerPos} draggable onDragEnd={handleMarkerDragEnd} />
                  </GoogleMap>
                ) : (
                  <div className="h-[320px] flex items-center justify-center text-sm opacity-70">
                    Cargando mapa…
                  </div>
                )}
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm rounded-xl"
                  onClick={() => {
                    updateLatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
                    setField("address", "");
                  }}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline rounded-xl"
                  onClick={() => reverseGeocode(markerPos.lat, markerPos.lng)}
                >
                  Obtener dirección del pin
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <i class="fa-solid fa-camera"></i>
            <span className="label-text">
              Imagen (opcional)
            </span></label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full rounded-xl"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        </div>
      </div>
    </div>
  );
}
