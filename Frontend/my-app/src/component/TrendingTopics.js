import React, { useState } from "react";
import axios from "axios";

const TrendingTopics = () => {
  const [trends, setTrends] = useState(null); // To store response data
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  const fetchTrends = async () => {
    setLoading(true);
    setError(null); // Reset errors
    setTrends(null); // Reset trends before fetching

    try {
      const response = await axios.get("http://localhost:5000/api/trends");
      console.log("API Response:", response.data); // Log response for debugging
      setTrends(response.data);
    } catch (err) {
      console.error("Error fetching trends:", err);
      setError("Failed to fetch trends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchTrends} disabled={loading}>
        {loading ? "Fetching..." : "Click here to run the script"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {trends && trends.trends.length > 0 ? (
        <div>
          <h3>
            These are the most happening topics as of{" "}
            {new Date(trends.dateTime).toLocaleString()}
          </h3>
          <ul>
            {trends.trends.map((trend, index) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
          <p>The IP address used for this query was {trends.ipAddress}</p>
          <pre>{JSON.stringify(trends, null, 2)}</pre>
        </div>
      ) : (
        trends && <p>No trending topics found. Please try again later.</p>
      )}
    </div>
  );
};

export default TrendingTopics;
