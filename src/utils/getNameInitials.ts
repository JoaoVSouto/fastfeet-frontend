export function getNameInitials(name: string): string {
  const [firstName, lastName] = name.split(' ');

  if (!lastName) {
    return firstName[0];
  }

  return `${firstName[0]}${lastName[0]}`;
}
