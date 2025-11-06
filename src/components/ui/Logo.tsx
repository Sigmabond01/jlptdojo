export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 300 320"
        width="80"
        height="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="150" cy="150" r="90" fill="#000" stroke="#fff" strokeWidth="2" />

        <path
          d="M 150 60 A 90 90 0 0 1 150 240 A 45 45 0 0 1 150 150 A 45 45 0 0 0 150 60"
          fill="#fff"
        />

        <circle cx="150" cy="105" r="15" fill="#fff" />
        <circle cx="150" cy="195" r="15" fill="#000" />
      </svg>

    </div>
  );
}