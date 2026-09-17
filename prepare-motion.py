from pathlib import Path
import sys,json
sys.path.insert(0,str(Path(__file__).parent/'.tools'))
import imageio_ffmpeg
from PIL import Image,ImageDraw,ImageFilter
import numpy as np
root=Path(__file__).parent
out=root/'assets'/'motion'
out.mkdir(exist_ok=True)
reader=imageio_ffmpeg.read_frames(str(root/'assets'/'motion-source.mp4'),pix_fmt='rgb24',output_params=['-vf','scale=480:854','-r','24'])
meta=next(reader)
count=0
for raw in reader:
    im=Image.frombytes('RGB',(480,854),raw)
    a=np.asarray(im)
    white=(a.min(axis=2)>237)&((a.max(axis=2).astype(int)-a.min(axis=2))<18)
    mask=Image.fromarray(np.uint8(white)*255).copy()
    # Only remove near-white connected to canvas edge; retain white clothing and facial glow.
    for point in [(0,0),(479,0)]+[(x,y) for y in range(0,854,12) for x in (0,479)]:
        if mask.getpixel(point)==255: ImageDraw.floodfill(mask,point,128)
    alpha=Image.fromarray(np.where(np.asarray(mask)==128,0,255).astype('uint8')).filter(ImageFilter.GaussianBlur(.45))
    im.putalpha(alpha)
    im.save(out/f'{count:03}.webp',quality=88,method=3)
    count+=1
    if count%48==0:print(f'{count} frames ready',flush=True)
(out/'manifest.json').write_text(json.dumps({'count':count,'fps':24,'width':480,'height':854,'duration':count/24}))
print('DONE',count,flush=True)
