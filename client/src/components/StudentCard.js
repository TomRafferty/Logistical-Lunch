import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DateTime } from "luxon";

const StudentCard = () => {
      const [cardData, setCardData] = useState([]);

  // hook to fetch the event information and display it within the card
  useEffect(() => {
    fetch("http://localhost:3000/api/events/next")
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw `${response.status} ${response.statusText}`;
      })
      .then(function(data) {
        setCardData(data);
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });
  }, []);

  // function to convert timestamp string into an array of time an date
  const timeSplitter=(element)=> {
     return element.slice(0,16).split("T");
  };
  // typography styling
  const TypographyInner = styled(Typography)({
    variant: "h6",
    display: "inline",
    marginLeft: "10px",
    color: "text.primary",
    fontWeight: "bold",
  });

  return (
		<Box>
			<Paper>
				<Typography variant="h5" sx={{ mb: 2, mt: 2 }} align="center">
                    {/* optional heading, this can be changed */}
					{cardData.length === 0 ? "You have no Meetings" : cardData.length === 1 ? "You have 1 Meeting" : `You have ${cardData.length} Meetings`}
				</Typography>
			</Paper>

			{cardData.map((element) => {
				return (
					<Card key={element.id} sx={{ mt: 2 }}>
						<CardContent>
							<Typography variant="h6">
								Location:
								<TypographyInner>{element.meeting_location}</TypographyInner>
							</Typography>
							<Typography variant="h6">
								Date:
								<TypographyInner>
									{DateTime.fromISO(
										timeSplitter(element.meeting_start)[0]
									).toFormat("DDDD")}
								</TypographyInner>
							</Typography>
							<Typography variant="h6">
								Meeting starts:
								<TypographyInner>
									{DateTime.fromISO(
										timeSplitter(element.meeting_start)[1]
									).toFormat("HH:mm a")}
								</TypographyInner>
							</Typography>

							<Typography variant="h6">
								Meeting ends:
								<TypographyInner>
									{DateTime.fromISO(
										timeSplitter(element.meeting_end)[1]
									).toFormat("HH:mm a")}
								</TypographyInner>
							</Typography>

							<Typography variant="h6">
								Address:
								<TypographyInner>{element.meeting_address_1}</TypographyInner>
							</Typography>

							<Typography variant="h6">
								Postcode:
								<TypographyInner>{element.meeting_postcode}</TypographyInner>
							</Typography>

							<Typography variant="h6">
								City:
								<TypographyInner>{element.meeting_city}</TypographyInner>
							</Typography>
						</CardContent>
						<></>
					</Card>
				);
			})}
		</Box>
	);
};

export default StudentCard;