interface AgencyCardProps {
  image: string;
  title: string;
  address: string;
  phone?: string;
  schedule?: string;
}

export default function AgencyCard({
  image,
  title,
  address,
  phone,
  schedule,
}: AgencyCardProps) {
  return (
    <div className="card bg-base-100 w-full max-w-sm sm:max-w-md shadow-sm">
      
      <figure>
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body bg-white">
        <h3 className="card-title text-indigo-950">
          {title}
        </h3>

        <p className="text-indigo-950">
          Dirección: {address}
        </p>

        {phone && (
          <p className="text-indigo-950">
            Teléfono: {phone}
          </p>
        )}

        {schedule && (
          <p className="text-indigo-950">
            Horario: {schedule}
          </p>
        )}
      </div>

    </div>
  );
}
