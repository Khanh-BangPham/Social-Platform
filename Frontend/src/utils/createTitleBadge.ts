const canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 30;
canvas.height = 30;

let icon = document.querySelector('[rel="icon"]');

let iconUrl = icon?.getAttribute('href') as string;
var _img = new Image();
_img.crossOrigin = 'Anonymous';

_img.src = iconUrl;

export const createTitleBadge = (num: number) => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    num = parseInt(num.toString());
    if (num > 0) {
      if (_img) {
        ctx.drawImage(_img, 0, 0, _img.width, _img.height, 0, 0, 30, 30);
      }

      ctx.fillStyle = 'red';

      ctx.beginPath();
      ctx.arc(19, 19, 12, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(
        num.toString(),
        canvas.width / 2 + 3,
        canvas.height / 2 + 12,
      );
      const img = canvas.toDataURL('image/png');

      (icon as any).href = img;
    } else {
      (icon as any).href = iconUrl;
    }
  }
};
