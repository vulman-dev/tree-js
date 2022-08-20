import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 100 }),
    mkfile('passport.jpg', { size: 200 }),
    mkfile('family.jpg', { size: 150 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations')
]);

const compressImages = (tree) => {
    const children = getChildren(tree);
    const newChildren = children.map((child) => {
        const name = getName(child);
        const newMeta = _.cloneDeep(getMeta(child));
        if (!isFile(child) || !name.endsWith('.jpg')) {
            return child;
        }
        newMeta.size /= 2;
        return mkfile(name, newMeta);
    });

    const newMeta = _.cloneDeep(getMeta(tree));
    return mkdir(getName(tree), newChildren, newMeta);
};

console.log(compressImages(tree));