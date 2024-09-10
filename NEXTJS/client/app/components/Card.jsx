// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardActions from '@mui/material/CardActions';

// export default function MultiActionAreaCard({ image, title, content, buttonLabel }) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image={image}
//           alt={title}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             {content}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           {buttonLabel}
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Link from 'next/link';

export default function MultiActionAreaCard({ image, title, content, buttonLabel, link }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#082f49" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
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
