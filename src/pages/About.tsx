const About = () => {
  return (
    <div className="bg-light flex min-h-screen flex-col items-center justify-center px-4 py-10 transition-colors duration-500 dark:bg-dark">
      <h1 className="mb-6 text-4xl font-extrabold text-orange drop-shadow-lg">
        ჩვენს შესახებ
      </h1>
      <div className="dark:bg-charcoal w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          KAN-GUROO
        </h2>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          ჩვენი ონლაინ მაღაზია გთავაზობთ თანამედროვე, ხარისხიან და მრავალფეროვან
          პროდუქციას. ჩვენი მიზანია, მომხმარებელს შევთავაზოთ საუკეთესო არჩევანი,
          სწრაფი მიწოდება და კომფორტული მომსახურება.
        </p>
        <ul className="mb-6 list-disc pl-6 text-lg text-gray-700 dark:text-gray-300">
          <li>მაღალი ხარისხის პროდუქცია</li>
          <li>სწრაფი და უსაფრთხო მიწოდება</li>
          <li>მომხმარებელზე ორიენტირებული სერვისი</li>
          <li>მუდმივად განახლებული ასორტიმენტი</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          თუ გაქვთ კითხვები ან შემოთავაზებები, შეგიძლიათ დაგვიკავშირდეთ{" "}
          <span className="text-orange">info@kan-guroo.com</span> ან{" "}
          <span className="text-orange">+995 577 30 25 25</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
