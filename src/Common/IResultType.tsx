interface ResultType {
    type: string;
    value: string;
    joueur?: {
      type: string;
      value: string;
    };
    club?: {
      type: string;
      value: string;
    };
    name: {
      xml: {
        lang: string;
      };
      type: string;
      value: string;
    };
    nom?: {
      xml: {
        lang: string;
      };
      type: string;
      value: string;
    };
  }
  export default ResultType;
