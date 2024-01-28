// CardComponent.js
import React from 'react';
import { useQuery ,gql} from '@apollo/client';
import { CompanyLogo,NewMembersLogo,RegularMembersLogo,Rating} from "./logos"

const GET_MEMBERS = gql`
  query {
    getMembers {
      type
      rating
      Total
      newMembers
      regularMembers
    }
  }
`;

const CardComponent = ({ type }) => {
  const { loading, error, data } = useQuery(GET_MEMBERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const item = data.getMembers.find(item => item.type === type);

  return (
    <div className="box col-sm-12 col-md-5 col-lg-2 py-4 pb-lg-5 text-center">
      {type === "reviews" && (
        <>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            value={parseFloat(item.rating) || 0}
            readOnly
          />
          <h2>{item.rating}</h2>
          <h5>Rating</h5>
        </>
      )}
      {type === "companyMembers" && (
        <>
          <CompanyLogo/>
          <h2>{item.Total}</h2>
          <h5>Total</h5>
        </>
      )}
      {type === "newMembers" && (
        <>
          <NewMembersLogo/>
          <h2>{item.newMembers}</h2>
          <h5>New</h5>
        </>
      )}
      {type === "regularMembers" && (
        <>
          <RegularMembersLogo/>
          <h2>{item.regularMembers}</h2>
          <h5>Regular</h5>
        </>
      )}
    </div>
  );
};

export default CardComponent;
