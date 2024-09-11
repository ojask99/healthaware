import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Link from 'next/link';

export default function MultiActionAreaCard({ image, title, content, buttonLabel, link, imageWidth = 345 , imageHeight = 250 }) {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        backgroundColor: "#082f49", 
        borderRadius: '16px',  // Rounded corners
        boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.5)',  // Blurry shadow
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Smooth transition
        '&:hover': {
          transform: 'translateY(-10px)',  // Uplift on hover
          boxShadow: '10px 10px 30px 0px rgba(0,0,0,0.75)',  // Stronger shadow on hover
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: imageWidth,
            height: imageHeight,
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={link} passHref>
          <Button size="small" sx={{ color: "#06b6d4" }}>
            {buttonLabel}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
