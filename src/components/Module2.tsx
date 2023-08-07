import { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";
import { Module } from "sample-app-shared/dist/esm/components/Module";
import { useSampleAppContext } from "sample-app-shared/dist/esm/contexts/sample-app";

// -----------------------------------------------------------------

export const Module2 = () => {
  const [loading, setLoading] = useState(false);
  const { number, region, updateAppContext } = useSampleAppContext();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(`https://restcountries.com/v3.1/currency/cop`);

      if (res) {
        const resObj = await res.json();

        if (resObj && resObj.length > 0) {
          const region = resObj[0].region;

          if (region) {
            updateAppContext({ region });
          }
        }
      }
    } catch (err) {
      console.error("Error at getting region: ", err);
    } finally {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Module name={"Module 1 - Module 2"}>
      <h2>
        Total: {number.toFixed(2)}
        <br />
        {loading ? <Spin /> : region}
      </h2>
    </Module>
  );
};
