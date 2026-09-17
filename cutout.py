from PIL import Image, ImageFilter, ImageDraw
import numpy as np

from pathlib import Path
root=Path(__file__).parent/'assets'
for n in range(1,5):
    im=Image.open(root/f'pose-{n:02}-source.png').convert('RGB')
    a=np.array(im)
    white=(a.min(axis=2)>235)&(a.max(axis=2).astype(int)-a.min(axis=2)<20)
    mask=Image.fromarray(np.uint8(white)*255).copy()
    ImageDraw.floodfill(mask,(0,0),128)
    ImageDraw.floodfill(mask,(im.width-1,0),128)


    for y in range(im.height):
        for x in (0,im.width-1):
            if mask.getpixel((x,y))==255: ImageDraw.floodfill(mask,(x,y),128)
    bg=np.array(mask)==128
    # White gaps between fingers are also backdrop; exclude lower clothing region.
    bg[:int(im.height*.59)] |= white[:int(im.height*.59)]
    alpha=Image.fromarray(np.uint8(~bg)*255).filter(ImageFilter.GaussianBlur(.65))
    im.putalpha(alpha)
    im.save(root/f'pose-{n:02}.png')
    print(n,im.size,'transparent pixels',int(bg.sum()))



