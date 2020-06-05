
const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];
  
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  
  //foreach
  
  // companies.forEach(company => console.log(company));
  
  //filter
  
  //gets all elements from ages over 17 and adds them to array canDrink
  const canDrink = ages.filter((age) => age >= 18);
  console.log(canDrink);
  
  //get all retail companies
  const retails = companies.filter((company) => company.category === "Retail");
  console.log(retails);
  
  //Map
  const companyNames = companies.map((company) => company.name);
  console.log(companyNames);
  //multiple map functions
  const ageMap = ages
      .map((age) => Math.pow(age, 2))
      .map((age) => age / 2);
  console.log(ageMap);
  
  //sort
  const sortedCompanies = companies.sort((c1, c2) =>
    c1.start > c2.start ? true : false
  );
  console.log(sortedCompanies);
  
  const sortAges = ages.sort((a1,a2)=>a1-a2);
  console.log(sortAges);
  
  
  //reduce
  //the 0 is the second parameter and it is the total but initialy it is 0
  const sumAge = ages.reduce((total,age)=>total+age,0);
  console.log(sumAge);